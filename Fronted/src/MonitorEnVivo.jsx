import { useState, useEffect } from "react";
import { obtenerResumenDocente, cambiarEstadoTema } from "./shared/apiService";

export default function MonitorEnVivo() {
  const [resumen, setResumen] = useState(null);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    try {
      const data = await obtenerResumenDocente();
      setResumen(data);
    } catch (e) {
      console.error("Error cargando resumen:", e);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
    const id = setInterval(cargarDatos, 4000);
    return () => clearInterval(id);
  }, []);

  const toggleTema = async () => {
    if (!resumen) return;
    const nuevoEstado = !resumen.activo;
    await cambiarEstadoTema(nuevoEstado);
    setResumen({ ...resumen, activo: nuevoEstado });
  };

  if (cargando || !resumen) {
    return (
      <div style={{ padding: 16, background: "#11221b", color: "#a7f3d0", borderRadius: 12, marginBottom: 16 }}>
        Conectando con el monitor en vivo...
      </div>
    );
  }

  const errores = [
    { key: "err_signo", label: "Cambio de signo", count: resumen.errores_frecuentes?.err_signo || 0, color: "#f97316" },
    { key: "err_coeficiente", label: "Despeje de coeficiente", count: resumen.errores_frecuentes?.err_coeficiente || 0, color: "#eab308" },
    { key: "err_termino", label: "Mezcla de términos", count: resumen.errores_frecuentes?.err_termino || 0, color: "#ef4444" },
  ];

  return (
    <div style={{ background: "#0f241c", border: "1px solid #1f4d3b", borderRadius: 16, padding: 18, marginBottom: 20, color: "#ecfdf5" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
        <div>
          <span style={{ fontSize: 11, textTransform: "uppercase", color: "#34d399", fontWeight: 700 }}>
            ? En vivo · 1.º Básico (Grupo Zorro ??)
          </span>
          <h3 style={{ margin: "4px 0 0", fontSize: 18 }}>Ecuaciones lineales (ax + b = c)</h3>
        </div>

        <button
          onClick={toggleTema}
          style={{
            padding: "10px 16px",
            borderRadius: 10,
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
            background: resumen.activo ? "#10b981" : "#dc2626",
            color: "#fff",
          }}
        >
          {resumen.activo ? "Tema HABILITADO ?" : "Tema PAUSADO ?"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 16 }}>
        {errores.map((e) => (
          <div key={e.key} style={{ background: "#163328", padding: 12, borderRadius: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
              <span>{e.label}</span>
              <strong style={{ color: e.color }}>{e.count}</strong>
            </div>
            <div style={{ height: 6, background: "#0a1913", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ width: `${Math.min(100, (e.count / Math.max(1, resumen.total_estudiantes)) * 100)}%`, height: "100%", background: e.color }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 13 }}>
        <p style={{ margin: "0 0 8px", color: "#a7f3d0", fontWeight: 600 }}>
          Progreso real del salón ({resumen.total_estudiantes} estudiantes):
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {resumen.estudiantes.map((est, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", background: "#163328", padding: "8px 12px", borderRadius: 8 }}>
              <strong>{est.estudiante}</strong>
              <span>
                Antes: <span style={{ color: "#fbbf24" }}>{est.antes}%</span> ? Después:{" "}
                <strong style={{ color: "#34d399" }}>{est.despues}%</strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
