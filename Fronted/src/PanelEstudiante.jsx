import { useState, useEffect } from 'react'
import { ESTUDIANTE, MATERIAS, TAREAS_INICIALES, EVENTOS, AVISOS_INICIALES, HOY } from './dataEstudiante'
import './PanelEstudiante.css'

const PRACTICA_URL = window.location.hostname.includes('devtunnels.ms')
  ? 'https://nxdqpgfn-5173.use2.devtunnels.ms'
  : `http://${window.location.hostname}:5173`

/* ---------- Iconos ---------- */
const ICONOS = {
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  cerrar: <path d="M6 6l12 12M18 6L6 18" />,
  atras: <path d="M19 12H5M12 19l-7-7 7-7" />,
  siguiente: <path d="M5 12h14M12 5l7 7-7 7" />,
  check: <path d="M5 12l5 5L20 7" />,
  abajo: <path d="M6 9l6 6 6-6" />,
  tablero: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  calendario: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  tareas: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v2h6V3M9 12l2 2 4-4M9 17h6" />
    </>
  ),
  avisos: (
    <>
      <path d="M6 16v-5a6 6 0 1 1 12 0v5l2 2H4z" />
      <path d="M10 21h4" />
    </>
  ),
  temas: <path d="M18 5H7l6 7-6 7h11" />,
  notas: <path d="M5 21V10M12 21V4M19 21v-7" />,
}

function Ico({ nombre, size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONOS[nombre]}
    </svg>
  )
}

/* ---------- Utilidades ---------- */
const iniciales = (n) => n.split(' ').slice(0, 2).map((p) => p[0]).join('')
const formato = new Intl.DateTimeFormat('es-GT', { weekday: 'short', day: 'numeric', month: 'short' })
const fmtDia = (iso) => {
  const [a, m, d] = iso.split('-').map(Number)
  return formato.format(new Date(a, m - 1, d))
}
const materiaDe = (id) => MATERIAS.find((m) => m.id === id)
const porFecha = (a, b) => a.fecha.localeCompare(b.fecha)
const ESTADO = { pendiente: 'Por hacer', entregada: 'Entregada', calificada: 'Calificada' }
const subtituloGrupo = `Grupo ${ESTUDIANTE.grupo}, ${ESTUDIANTE.grado}`

const TABS = [
  { id: 'tablero', nombre: 'Tablero', icono: 'tablero' },
  { id: 'calendario', nombre: 'Calendario', icono: 'calendario' },
  { id: 'hacer', nombre: 'Por hacer', icono: 'tareas' },
  { id: 'avisos', nombre: 'Avisos', icono: 'avisos' },
]

const SECCIONES_CURSO = [
  { id: 'tareas', nombre: 'Tareas', icono: 'tareas' },
  { id: 'temas', nombre: 'Temas', icono: 'temas' },
  { id: 'notas', nombre: 'Calificaciones', icono: 'notas' },
]

function BotonPractica({ onPracticar }) {
  return (
    <button
      onClick={onPracticar}
      style={{
        width: '100%',
        padding: '15px 18px',
        borderRadius: 14,
        border: 'none',
        background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
        color: '#ffffff',
        fontWeight: 700,
        fontSize: 15,
        cursor: 'pointer',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 6px 18px rgba(37, 99, 235, 0.35)',
      }}
    >
      <span>?? Practicar: Ecuaciones lineales</span>
      <span>?</span>
    </button>
  )
}

/* ---------- Piezas reutilizables ---------- */
function Barra({ valor }) {
  return (
    <div className="est-barra-prog" role="img" aria-label={`Avance ${valor}%`}>
      <div style={{ width: `${valor}%` }} />
    </div>
  )
}

function TareaItem({ t, conMateria, onMarcar }) {
  const m = materiaDe(t.materiaId)
  const hecha = t.estado !== 'pendiente'
  return (
    <li className="est-tarea" style={{ '--color': m.color }}>
      {onMarcar && (
        <button
          className="est-check"
          role="checkbox"
          aria-checked={hecha}
          aria-label={`Marcar como entregada: ${t.titulo}`}
          disabled={hecha}
          onClick={() => onMarcar(t.id)}
        >
          {hecha && <Ico nombre="check" size={16} />}
        </button>
      )}
      <div className="est-tarea-datos">
        <span className="est-titulo-fila">{t.titulo}</span>
        <span className="est-detalle">
          {conMateria && `${m.nombre}, `}entrega {fmtDia(t.fecha)}
        </span>
      </div>
      <span className={`est-etiqueta ${t.estado}`}>
        {t.estado === 'calificada' ? t.nota : ESTADO[t.estado]}
      </span>
    </li>
  )
}

/* ---------- Tablero ---------- */
function Tablero({ tareas, onMateria }) {
  const pendientes = (id) => tareas.key ? 0 : tareas.filter((t) => t.materiaId === id && t.estado === 'pendiente').length
  return (
    <>
      <h2 className="est-h2">Materias</h2>
      <div className="est-cursos">
        {MATERIAS.map((m) => {
          const p = tareas.filter((t) => t.materiaId === m.id && t.estado === 'pendiente').length
          return (
            <button key={m.id} className="est-curso" style={{ '--color': m.color }} onClick={() => onMateria(m.id)}>
              <span className="est-curso-banda">
                <span className="est-curso-emoji" aria-hidden="true">{m.emoji}</span>
                {p > 0 && <span className="est-curso-pend">{p} por hacer</span>}
              </span>
              <span className="est-curso-cuerpo">
                <span className="est-curso-titulo">{m.nombre}</span>
                <span className="est-curso-grupo">{subtituloGrupo}</span>
                <span className="est-detalle">{m.docente}</span>
              </span>
            </button>
          )
        })}
      </div>

      <h2 className="est-h2">Mi grupo</h2>
      <div className="est-grupo">
        <span className="est-grupo-emoji" aria-hidden="true">{ESTUDIANTE.emoji}</span>
        <div className="est-grupo-datos">
          <strong>Grupo {ESTUDIANTE.grupo}</strong>
          <span className="est-detalle">
            {ESTUDIANTE.grado}, {ESTUDIANTE.companeros.length + 1} estudiantes
          </span>
          <div className="est-avatares">
            {ESTUDIANTE.companeros.map((n) => (
              <span key={n} className="est-avatar" title={n}>{iniciales(n)}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------- Calendario ---------- */
function Calendario({ tareas }) {
  const items = [
    ...tareas.map((t) => ({ id: `t${t.id}`, fecha: t.fecha, titulo: t.titulo, materiaId: t.materiaId, tipo: 'Tarea' })),
    ...EVENTOS.map((e) => ({ id: `e${e.id}`, fecha: e.fecha, titulo: e.titulo, materiaId: e.materiaId, tipo: 'Evento' })),
  ]
    .filter((i) => i.fecha >= HOY)
    .sort(porFecha)

  const dias = items.reduce((acc, i) => {
    ;(acc[i.fecha] ||= []).push(i)
    return acc
  }, {})

  if (items.length === 0) return <p className="est-vacio">No tienes fechas próximas.</p>

  return (
    <div className="est-dias">
      {Object.keys(dias).sort().map((f) => (
        <section key={f} className="est-dia">
          <h3>{fmtDia(f)}</h3>
          <ul className="est-lista-tareas">
            {dias[f].map((i) => {
              const m = materiaDe(i.materiaId)
              return (
                <li key={i.id} className="est-evento" style={{ '--color': m.color }}>
                  <span className="est-detalle">{i.tipo}, {m.nombre}</span>
                  <span className="est-titulo-fila">{i.titulo}</span>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}

/* ---------- Por hacer ---------- */
function PorHacer({ tareas, onMarcar }) {
  const pendientes = tareas.filter((t) => t.estado === 'pendiente').sort(porFecha)
  const entregadas = tareas.filter((t) => t.estado === 'entregada').sort(porFecha)
  return (
    <>
      {pendientes.length === 0 && <p className="est-vacio">No tienes tareas pendientes. Todo está entregado.</p>}
      <ul className="est-lista-tareas">
        {pendientes.map((t) => <TareaItem key={t.id} t={t} conMateria onMarcar={onMarcar} />)}
      </ul>
      {entregadas.length > 0 && (
        <>
          <h2 className="est-h2">Entregadas, esperando nota</h2>
          <ul className="est-lista-tareas">
            {entregadas.map((t) => <TareaItem key={t.id} t={t} conMateria onMarcar={onMarcar} />)}
          </ul>
        </>
      )}
    </>
  )
}

/* ---------- Avisos ---------- */
function Avisos({ avisos, onLeer }) {
  return (
    <ul className="est-lista-tareas">
      {avisos.map((a) => {
        const m = materiaDe(a.materiaId)
        return (
          <li key={a.id}>
            <button className={`est-aviso ${a.leido ? '' : 'nuevo'}`} style={{ '--color': m.color }} onClick={() => onLeer(a.id)}>
              <span className="est-punto" aria-hidden="true" />
              <span className="est-aviso-texto">
                <span className="est-detalle">{m.nombre}, {a.hace}</span>
                <span className="est-titulo-fila">{a.texto}</span>
              </span>
              {!a.leido && <span className="est-oculto">Nuevo</span>}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

/* ---------- Detalle de una materia ---------- */
function Curso({ m, tareas, seccion, onSeccion, onPracticar }) {
  const mias = tareas.filter((t) => t.materiaId === m.id).sort(porFecha)
  const notas = mias.filter((t) => t.estado === 'calificada')
  const prom = notas.length ? Math.round(notas.reduce((s, t) => s + t.nota, 0) / notas.length) : null
  const pend = mias.filter((t) => t.estado === 'pendiente').length
  const esMate = m.nombre.toLowerCase().includes('matem')

  if (!seccion) {
    return (
      <>
        <div className="est-resumen">
          <div><strong>{prom ?? '-'}</strong><span>promedio</span></div>
          <div><strong>{pend}</strong><span>por hacer</span></div>
        </div>

        {esMate && <BotonPractica onPracticar={onPracticar} />}

        <nav className="est-lista" aria-label={`Secciones de ${m.nombre}`}>
          {SECCIONES_CURSO.map((s) => (
            <button key={s.id} className="est-fila" onClick={() => onSeccion(s.id)}>
              <span className="est-fila-icono"><Ico nombre={s.icono} /></span>
              <span className="est-fila-texto">{s.nombre}</span>
              <Ico nombre="siguiente" size={20} />
            </button>
          ))}
        </nav>
      </>
    )
  }

  if (seccion === 'tareas') {
    return <ul className="est-lista-tareas">{mias.map((t) => <TareaItem key={t.id} t={t} />)}</ul>
  }

  if (seccion === 'temas') {
    return (
      <>
        {esMate && <BotonPractica onPracticar={onPracticar} />}
        <ul className="est-lista-tareas">
          {m.temas.map((tema) => {
            const cabeza = (
              <span className="est-tema-cabeza">
                <span className="est-titulo-fila">{tema.titulo}</span>
                <span className="est-detalle">{tema.avance}% visto</span>
                <Barra valor={tema.avance} />
              </span>
            )
            return (
              <li key={tema.id}>
                {tema.subtemas ? (
                  <details className="est-tema">
                    <summary>{cabeza}<Ico nombre="abajo" size={20} /></summary>
                    <ul className="est-subtemas">
                      {tema.subtemas.map((s) => (
                        <li key={s.t} className={s.hecho ? 'hecho' : ''}>
                          <span className="est-marca">{s.hecho && <Ico nombre="check" size={14} />}</span>
                          {s.t}
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <div className="est-tema"><div className="est-tema-solo">{cabeza}</div></div>
                )}
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  return (
    <>
      <div className="est-resumen">
        <div><strong>{prom ?? '-'}</strong><span>promedio de {m.nombre}</span></div>
      </div>
      {notas.length === 0 && <p className="est-vacio">Todavía no tienes tareas calificadas en esta materia.</p>}
      <ul className="est-lista-tareas est-espacio">
        {notas.map((t) => (
          <li key={t.id} className="est-nota">
            <span className="est-titulo-fila">{t.titulo}</span>
            <strong>{t.nota}</strong>
          </li>
        ))}
      </ul>
    </>
  )
}

/* ---------- Panel del estudiante ---------- */
export default function PanelEstudiante({ onSalir }) {
  const [tab, setTab] = useState('tablero')
  const [materiaId, setMateriaId] = useState(null)
  const [seccion, setSeccion] = useState(null)
  const [tareas, setTareas] = useState(TAREAS_INICIALES)
  const [avisos, setAvisos] = useState(AVISOS_INICIALES)
  const [menu, setMenu] = useState(false)
  const [enPractica, setEnPractica] = useState(false)

  useEffect(() => {
    if (!menu) return
    const alTeclear = (e) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [menu])

  if (enPractica) {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#0f241c', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#a7f3d0', fontWeight: 700, fontSize: 14 }}>Práctica activa · Grupo {ESTUDIANTE.grupo}</span>
          <button
            onClick={() => setEnPractica(false)}
            style={{ background: '#1f4d3b', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
          >
            ? Volver a Matemáticas
          </button>
        </div>
        <iframe
          src={PRACTICA_URL}
          title="Práctica de Ecuaciones"
          style={{ flex: 1, width: '100%', border: 'none' }}
        />
      </div>
    )
  }

  const materia = materiaDe(materiaId)
  const seccionCurso = SECCIONES_CURSO.find((s) => s.id === seccion)

  const marcar = (id) => setTareas((ts) => ts.map((t) => (t.id === id ? { ...t, estado: 'entregada' } : t)))
  const leer = (id) => setAvisos((as) => as.map((a) => (a.id === id ? { ...a, leido: true } : a)))
  const irTab = (id) => {
    setTab(id)
    setMateriaId(null)
    setSeccion(null)
  }
  const atras = () => (seccion ? setSeccion(null) : setMateriaId(null))

  const badges = {
    hacer: tareas.filter((t) => t.estado === 'pendiente').length,
    avisos: avisos.filter((a) => !a.leido).length,
  }

  const titulo = materia
    ? seccionCurso ? seccionCurso.nombre : materia.nombre
    : TABS.find((t) => t.id === tab).nombre
  const subtitulo = materia && seccionCurso ? `${materia.nombre}, Grupo ${ESTUDIANTE.grupo}` : subtituloGrupo

  return (
    <div className="est-app" style={{ '--acento': materia ? materia.color : ESTUDIANTE.color }}>
      <div className="est-principal">
        <header className="est-barra">
          {materia ? (
            <button className="est-btn" onClick={atras} aria-label="Volver"><Ico nombre="atras" /></button>
          ) : (
            <button className="est-btn" onClick={() => setMenu(true)} aria-label="Abrir menú"><Ico nombre="menu" /></button>
          )}
          <div className="est-titulos">
            <h1>{titulo}</h1>
            <p>{subtitulo}</p>
          </div>
          <span className="est-emoji" aria-hidden="true">{ESTUDIANTE.emoji}</span>
        </header>

        <main className="est-contenido">
          {materia && (
            <Curso
              m={materia}
              tareas={tareas}
              seccion={seccion}
              onSeccion={setSeccion}
              onPracticar={() => {
                if (window.location.hostname.includes('devtunnels.ms')) {
                  window.open(PRACTICA_URL, '_blank', 'noopener,noreferrer')
                } else {
                  setEnPractica(true)
                }
              }}
            />
          )}
          {!materia && tab === 'tablero' && <Tablero tareas={tareas} onMateria={setMateriaId} />}
          {!materia && tab === 'calendario' && <Calendario tareas={tareas} />}
          {!materia && tab === 'hacer' && <PorHacer tareas={tareas} onMarcar={marcar} />}
          {!materia && tab === 'avisos' && <Avisos avisos={avisos} onLeer={leer} />}
        </main>
      </div>

      <nav className="est-tabs" aria-label="Secciones">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`est-tab ${!materia && tab === t.id ? 'activo' : ''}`}
            aria-current={!materia && tab === t.id ? 'page' : undefined}
            onClick={() => irTab(t.id)}
          >
            <span className="est-tab-ico">
              <Ico nombre={t.icono} />
              {badges[t.id] > 0 && <span className="est-badge">{badges[t.id]}</span>}
            </span>
            <span>{t.nombre}</span>
          </button>
        ))}
      </nav>

      {menu && (
        <>
          <div className="est-fondo" onClick={() => setMenu(false)} />
          <aside className="est-drawer" role="dialog" aria-modal="true" aria-label="Menú del estudiante">
            <button className="est-btn est-cerrar" onClick={() => setMenu(false)} aria-label="Cerrar menú">
              <Ico nombre="cerrar" />
            </button>
            <span className="est-avatar grande">{iniciales(ESTUDIANTE.nombre)}</span>
            <strong className="est-drawer-nombre">{ESTUDIANTE.nombre}</strong>
            <span className="est-detalle">{subtituloGrupo}</span>
            <button className="est-salir" onClick={onSalir}>Cambiar de panel</button>
          </aside>
        </>
      )}
    </div>
  )
}
