import { MOCK_TEMA } from "../data/mockTema";

// Cuando Persona 1 tenga el servidor listo, pega aquí la URL (ej: "http://10.14.114.50:8000")
// Si lo dejas vacío "", la app corre 100% offline con datos locales.
const API_URL = "";

export async function obtenerTema(codigoClase) {
  if (!API_URL) return MOCK_TEMA;

  try {
    const res = await fetch(`${API_URL}/tema/${codigoClase}`);
    if (!res.ok) throw new Error("Error al cargar tema");
    const data = await res.json();
    localStorage.setItem("tema_cache", JSON.stringify(data));
    return data;
  } catch {
    const cached = localStorage.getItem("tema_cache");
    return cached ? JSON.parse(cached) : MOCK_TEMA;
  }
}

export async function enviarResultado(payload) {
  // 1. Siempre guarda respaldo local (sirve para modo offline y demo)
  const historial = JSON.parse(localStorage.getItem("mate_resultados") || "[]");
  historial.push({ ...payload, timestamp: new Date().toISOString() });
  localStorage.setItem("mate_resultados", JSON.stringify(historial));

  // 2. Si hay backend de Persona 1, lo envía sin bloquear la pantalla si falla
  if (!API_URL) return;
  try {
    await fetch(`${API_URL}/resultado`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.warn("Sin conexión con backend, guardado en caché local:", err);
  }
}
