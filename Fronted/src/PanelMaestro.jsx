import { useState, useEffect } from 'react'
import { GRADOS } from './data'
import './PanelMaestro.css'

/* ---------- Iconos (SVG en línea, sin dependencias) ---------- */
const ICONOS = {
  atras: <path d="M19 12H5M12 19l-7-7 7-7" />,
  siguiente: <path d="M5 12h14M12 5l7 7-7 7" />,
  estudiantes: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2.1.7 3.5 2.6 3.5 5.7" />
    </>
  ),
  tareas: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v2h6V3M9 12l2 2 4-4M9 17h6" />
    </>
  ),
  matematicas: <path d="M18 5H7l6 7-6 7h11" />,
  check: <path d="M5 12l5 5L20 7" />,
  buscar: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </>
  ),
  abajo: <path d="M6 9l6 6 6-6" />,
}

function Icono({ nombre, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONOS[nombre]}
    </svg>
  )
}

/* ---------- Secciones disponibles dentro de cada grado ---------- */
const SECCIONES = [
  { id: 'estudiantes', nombre: 'Estudiantes', icono: 'estudiantes' },
  { id: 'tareas', nombre: 'Tareas', icono: 'tareas' },
  { id: 'matematicas', nombre: 'Temas de matemáticas', icono: 'matematicas' },
]

const iniciales = (nombre) =>
  nombre.split(' ').slice(0, 2).map((p) => p[0]).join('')

const normalizar = (t) =>
  t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

/* ---------- Piezas reutilizables ---------- */
function Fila({ icono, emoji, titulo, detalle, onClick }) {
  return (
    <button className="fila" onClick={onClick}>
      <span className="fila-icono">
        {emoji ? <span className="emoji">{emoji}</span> : <Icono nombre={icono} />}
      </span>
      <span className="fila-texto">
        <span className="fila-titulo">{titulo}</span>
        {detalle && <span className="fila-detalle">{detalle}</span>}
      </span>
      <Icono nombre="siguiente" size={20} />
    </button>
  )
}

function Barra({ valor, etiqueta }) {
  return (
    <div className="barra" role="img" aria-label={`${etiqueta}: ${valor}%`}>
      <div className="barra-relleno" style={{ width: `${valor}%` }} />
    </div>
  )
}

/* ---------- Vistas ---------- */
function Inicio({ onElegir }) {
  const totalEst = GRADOS.reduce((s, g) => s + g.estudiantes.length, 0)
  const porCalificar = GRADOS.reduce(
    (s, g) => s + g.tareas.filter((t) => t.estado === 'por-calificar').length,
    0
  )
  return (
    <>
      <div className="resumen">
        <div>
          <strong>{totalEst}</strong>
          <span>estudiantes</span>
        </div>
        <div>
          <strong>{porCalificar}</strong>
          <span>tareas por calificar</span>
        </div>
      </div>

      <h2 className="subtitulo">Grados</h2>
      <nav className="lista" aria-label="Grados">
        {GRADOS.map((g) => (
          <Fila
            key={g.id}
            emoji={g.emoji}
            titulo={g.nombre}
            detalle={`Grupo ${g.animal}, ${g.estudiantes.length} estudiantes`}
            onClick={() => onElegir(g.id)}
          />
        ))}
      </nav>
    </>
  )
}

function MenuGrado({ grado, onElegir }) {
  const prom = Math.round(
    grado.estudiantes.reduce((s, e) => s + e.promedio, 0) / grado.estudiantes.length
  )
  const pendientes = grado.tareas.filter((t) => t.estado !== 'calificada').length
  const detalles = {
    estudiantes: `${grado.estudiantes.length} estudiantes`,
    tareas: `${pendientes} pendientes`,
    matematicas: `${grado.temas.length} temas`,
  }
  return (
    <>
      <div className="resumen">
        <div>
          <strong>{prom}</strong>
          <span>promedio del grupo</span>
        </div>
        <div>
          <strong>{pendientes}</strong>
          <span>tareas pendientes</span>
        </div>
      </div>
      <nav className="lista" aria-label={`Secciones de ${grado.nombre}`}>
        {SECCIONES.map((s) => (
          <Fila
            key={s.id}
            icono={s.icono}
            titulo={s.nombre}
            detalle={detalles[s.id]}
            onClick={() => onElegir(s.id)}
          />
        ))}
      </nav>
    </>
  )
}

function Estudiantes({ grado }) {
  const [q, setQ] = useState('')
  const lista = grado.estudiantes.filter((e) =>
    normalizar(e.nombre).includes(normalizar(q))
  )
  return (
    <>
      <label className="buscador">
        <Icono nombre="buscar" size={20} />
        <input
          type="search"
          placeholder="Buscar estudiante"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </label>

      {lista.length === 0 && (
        <p className="vacio">Ningún estudiante coincide con “{q}”. Prueba con otro nombre.</p>
      )}

      <ul className="tarjetas">
        {lista.map((e) => (
          <li key={e.id} className="estudiante">
            <span className="avatar">{iniciales(e.nombre)}</span>
            <div className="estudiante-datos">
              <span className="fila-titulo">{e.nombre}</span>
              <span className="fila-detalle">
                Promedio {e.promedio}, asistencia {e.asistencia}%
              </span>
              <Barra valor={e.promedio} etiqueta="Promedio" />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

const ESTADOS = {
  abierta: 'Abierta',
  'por-calificar': 'Por calificar',
  calificada: 'Calificada',
}

function Tareas({ grado }) {
  const [filtro, setFiltro] = useState('todas')
  const lista = grado.tareas.filter((t) => filtro === 'todas' || t.estado === filtro)
  return (
    <>
      <div className="chips" role="group" aria-label="Filtrar tareas">
        {[['todas', 'Todas'], ...Object.entries(ESTADOS)].map(([id, nombre]) => (
          <button
            key={id}
            className={`chip ${filtro === id ? 'activo' : ''}`}
            aria-pressed={filtro === id}
            onClick={() => setFiltro(id)}
          >
            {nombre}
          </button>
        ))}
      </div>

      {lista.length === 0 && <p className="vacio">No hay tareas con este estado.</p>}

      <ul className="tarjetas">
        {lista.map((t) => (
          <li key={t.id} className="tarea">
            <div className="tarea-cabeza">
              <span className="fila-titulo">{t.titulo}</span>
              <span className={`etiqueta ${t.estado}`}>{ESTADOS[t.estado]}</span>
            </div>
            <span className="fila-detalle">
              Entrega: {t.entrega}, {t.entregadas} de {t.total} entregadas
            </span>
            <Barra valor={(t.entregadas / t.total) * 100} etiqueta="Entregas" />
          </li>
        ))}
      </ul>
    </>
  )
}

function Matematicas({ grado }) {
  return (
    <ul className="tarjetas">
      {grado.temas.map((tema) => (
        <li key={tema.id}>
          <details className="tema">
            <summary>
              <span className="tema-cabeza">
                <span className="fila-titulo">{tema.titulo}</span>
                <span className="fila-detalle">{tema.avance}% visto</span>
                <Barra valor={tema.avance} etiqueta="Avance" />
              </span>
              <Icono nombre="abajo" size={20} />
            </summary>
            <ul className="subtemas">
              {tema.subtemas.map((s) => (
                <li key={s.t} className={s.hecho ? 'hecho' : ''}>
                  <span className="marca">{s.hecho && <Icono nombre="check" size={14} />}</span>
                  {s.t}
                </li>
              ))}
            </ul>
          </details>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Detectar pantalla grande ---------- */
function useEscritorio() {
  const consulta = '(min-width: 900px)'
  const [esc, setEsc] = useState(() => window.matchMedia(consulta).matches)
  useEffect(() => {
    const mq = window.matchMedia(consulta)
    const alCambiar = (e) => setEsc(e.matches)
    mq.addEventListener('change', alCambiar)
    return () => mq.removeEventListener('change', alCambiar)
  }, [])
  return esc
}

/* ---------- Menú lateral (solo en computadora) ---------- */
function Lateral({ gradoId, seccionActiva, onInicio, onGrado, onSeccion, onSalir }) {
  return (
    <aside className="lateral">
      <div className="lateral-marca">
        <span aria-hidden="true">🐾</span> Panel del maestro
      </div>

      <nav aria-label="Navegación principal">
        <button
          className={`lat-item ${!gradoId ? 'activo' : ''}`}
          style={{ '--acento': 'var(--jaguar)' }}
          onClick={onInicio}
        >
          Inicio
        </button>

        <p className="lat-titulo">Grados</p>
        {GRADOS.map((g) => (
          <div key={g.id} style={{ '--acento': g.color }}>
            <button
              className={`lat-item ${g.id === gradoId ? 'activo' : ''}`}
              onClick={() => onGrado(g.id)}
            >
              <span className="emoji">{g.emoji}</span> {g.nombre}
            </button>
            {g.id === gradoId && (
              <div className="lat-sub">
                {SECCIONES.map((sec) => (
                  <button
                    key={sec.id}
                    className={`lat-subitem ${sec.id === seccionActiva ? 'activo' : ''}`}
                    onClick={() => onSeccion(sec.id)}
                  >
                    <Icono nombre={sec.icono} size={18} />
                    {sec.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {onSalir && (
        <button className="lat-salir" onClick={onSalir}>
          Cambiar de panel
        </button>
      )}
    </aside>
  )
}

/* ---------- App ---------- */
export default function PanelMaestro({ onSalir }) {
  const escritorio = useEscritorio()
  const [gradoId, setGradoId] = useState(null)
  const [seccionId, setSeccionId] = useState(null)

  const grado = GRADOS.find((g) => g.id === gradoId)
  // En computadora, al elegir un grado se abre Estudiantes directamente
  const seccionActiva = seccionId ?? (escritorio && grado ? 'estudiantes' : null)
  const seccion = SECCIONES.find((s) => s.id === seccionActiva)

  const irInicio = () => {
    setGradoId(null)
    setSeccionId(null)
  }
  const elegirGrado = (id) => {
    setGradoId(id)
    setSeccionId(null)
  }
  const atras = () => {
    if (seccionId) setSeccionId(null)
    else if (gradoId) irInicio()
    else onSalir?.()
  }

  const titulo = seccion ? seccion.nombre : grado ? grado.nombre : 'Panel del maestro'
  const subtitulo = seccion
    ? grado.nombre
    : grado
    ? `Grupo ${grado.animal}, matemáticas`
    : 'Ciclo escolar 2026'

  return (
    <div
      className={`app ${escritorio ? 'escritorio' : ''}`}
      style={{ '--acento': grado ? grado.color : 'var(--jaguar)' }}
    >
      {escritorio && (
        <Lateral
          gradoId={gradoId}
          seccionActiva={seccionActiva}
          onInicio={irInicio}
          onGrado={elegirGrado}
          onSeccion={setSeccionId}
          onSalir={onSalir}
        />
      )}

      <div className="principal">
        <header className="barra-superior">
          {(grado || onSalir) && !escritorio && (
            <button className="btn-atras" onClick={atras} aria-label="Volver">
              <Icono nombre="atras" />
            </button>
          )}
          <div className="titulos">
            <h1>{titulo}</h1>
            <p>{subtitulo}</p>
          </div>
          {grado && <span className="emoji-grande" aria-hidden="true">{grado.emoji}</span>}
        </header>

        <main className="contenido">
          {!grado && <Inicio onElegir={elegirGrado} />}
          {grado && !seccion && <MenuGrado grado={grado} onElegir={setSeccionId} />}
          {grado && seccion?.id === 'estudiantes' && <Estudiantes grado={grado} />}
          {grado && seccion?.id === 'tareas' && <Tareas grado={grado} />}
          {grado && seccion?.id === 'matematicas' && <Matematicas grado={grado} />}
        </main>
      </div>
    </div>
  )
}