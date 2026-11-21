import temaLocal from './ecuaciones_1ro_basico.json';

const API_URL = 'http://localhost:3001';
const STORAGE_KEY = 'pisa_guatemala_resultados';
const ESTADO_TEMA_KEY = 'pisa_guatemala_tema_activo';

const DATOS_INICIALES = [
  { estudiante: 'María López', antes: 33, despues: 100, errores_antes: ['err_signo', 'err_coeficiente'], errores_despues: [] },
  { estudiante: 'Carlos Pérez', antes: 50, despues: 100, errores_antes: ['err_signo'], errores_despues: [] },
  { estudiante: 'Ana Morales', antes: 33, despues: 67, errores_antes: ['err_signo', 'err_termino'], errores_despues: ['err_termino'] },
  { estudiante: 'Luis Gómez', antes: 67, despues: 100, errores_antes: ['err_coeficiente'], errores_despues: [] },
  { estudiante: 'Sofía Ruiz', antes: 50, despues: 100, errores_antes: ['err_signo'], errores_despues: [] }
];

// 1. Obtener el tema y si está activo (Online -> Fallback Offline)
export async function obtenerTema() {
  try {
    const res = await fetch(`${API_URL}/tema`);
    if (!res.ok) throw new Error('Sin conexión');
    return await res.json();
  } catch {
    const activoLocal = JSON.parse(localStorage.getItem(ESTADO_TEMA_KEY) ?? 'true');
    return { activo: activoLocal, tema: temaLocal };
  }
}

// 2. Activar o desactivar el tema desde el Panel Docente (Switch)
export async function cambiarEstadoTema(activo) {
  localStorage.setItem(ESTADO_TEMA_KEY, JSON.stringify(Boolean(activo)));
  try {
    const res = await fetch(`${API_URL}/tema/estado`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activo: Boolean(activo) })
    });
    if (!res.ok) throw new Error('Sin conexión');
    return await res.json();
  } catch {
    return { activo: Boolean(activo) };
  }
}

// 3. Guardar el resultado del estudiante (Offline-first + Sync)
export async function guardarResultado(resultado) {
  const actuales = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(DATOS_INICIALES));
  actuales.push(resultado);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(actuales));

  try {
    const res = await fetch(`${API_URL}/resultado`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultado)
    });
    if (!res.ok) throw new Error('Sin conexión');
    return await res.json();
  } catch {
    console.warn('Modo offline: resultado guardado en localStorage.');
    return { ok: true, offline: true, total: actuales.length };
  }
}

// 4. Obtener estadísticas para el Panel Docente (Online -> Fallback Offline)
export async function obtenerResumenDocente() {
  try {
    const res = await fetch(`${API_URL}/resumen`);
    if (!res.ok) throw new Error('Sin conexión');
    return await res.json();
  } catch {
    const lista = JSON.parse(localStorage.getItem(STORAGE_KEY) || JSON.stringify(DATOS_INICIALES));
    const activoLocal = JSON.parse(localStorage.getItem(ESTADO_TEMA_KEY) ?? 'true');
    const conteo = { err_signo: 0, err_coeficiente: 0, err_termino: 0 };

    lista.forEach((r) => {
      (r.errores_antes || []).forEach((err) => {
        if (conteo[err] !== undefined) conteo[err]++;
      });
    });

    return {
      activo: activoLocal,
      total_estudiantes: lista.length,
      errores_frecuentes: conteo,
      estudiantes: lista
    };
  }
}