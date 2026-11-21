const IS_TUNNEL = window.location.hostname.includes("devtunnels.ms");
const API_URL = IS_TUNNEL
  ? "https://nxdqpgfn-3001.use2.devtunnels.ms"
  : `http://${window.location.hostname}:3001`;

export async function obtenerTema() {
  try {
    const res = await fetch(`${API_URL}/tema`);
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
    headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resultado),
    });
    return res.json();
  } catch {
    return { offline: true };
  }
}

export async function obtenerResumenDocente() {
  const res = await fetch(`${API_URL}/resumen`);
  return res.json();
}
