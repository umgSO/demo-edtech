const IS_TUNNEL = window.location.hostname.includes("devtunnels.ms");

const API_URL = import.meta.env.VITE_API_URL || (
  IS_TUNNEL
    ? "https://nxdqpgfn-3001.use2.devtunnels.ms"
    : `http://${window.location.hostname}:3001`
);

const API_KEY = import.meta.env.VITE_API_KEY;

function getHeaders(extra = {}) {
  const headers = { "Content-Type": "application/json", ...extra };
  if (API_KEY) headers["x-api-key"] = API_KEY;
  return headers;
}

export async function obtenerTema() {
  try {
    const res = await fetch(`${API_URL}/tema`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Error al obtener tema");
    const data = await res.json();
    localStorage.setItem("tema_cache", JSON.stringify(data));
    return data;
  } catch {
    const cached = localStorage.getItem("tema_cache");
    return cached ? JSON.parse(cached) : null;
  }
}

export async function cambiarEstadoTema(activo) {
  const res = await fetch(`${API_URL}/tema/estado`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ activo }),
  });
  return res.json();
}

export async function guardarResultado(resultado) {
  const historial = JSON.parse(localStorage.getItem("mate_resultados") || "[]");
  historial.push(resultado);
  localStorage.setItem("mate_resultados", JSON.stringify(historial));

  try {
    const res = await fetch(`${API_URL}/resultado`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(resultado),
    });
    return res.json();
  } catch {
    return { offline: true };
  }
}

export async function obtenerResumenDocente() {
  const res = await fetch(`${API_URL}/resumen`, {
    headers: getHeaders(),
  });
  return res.json();
}