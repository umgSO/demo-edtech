import { useState } from 'react'
import PanelMaestro from './PanelMaestro'
import PanelEstudiante from './PanelEstudiante'

function Bienvenida({ onElegir }) {
  return (
    <main className="bv">
      <span className="bv-huella" aria-hidden="true">🐾</span>
      <h1>¿Cómo quieres entrar?</h1>
      <div className="bv-opciones">
        <button className="bv-opcion" style={{ '--color': '#D9A441' }} onClick={() => onElegir('maestro')}>
          <span className="bv-emoji" aria-hidden="true">🦉</span>
          <span className="bv-texto">
            <strong>Maestro</strong>
            <span>Grados, estudiantes, tareas y temas</span>
          </span>
        </button>
        <button className="bv-opcion" style={{ '--color': '#E8873A' }} onClick={() => onElegir('estudiante')}>
          <span className="bv-emoji" aria-hidden="true">🦊</span>
          <span className="bv-texto">
            <strong>Estudiante</strong>
            <span>Mis materias, tareas y avisos</span>
          </span>
        </button>
      </div>
    </main>
  )
}

export default function App() {
  const [rol, setRol] = useState(null)

  if (rol === 'maestro') return <PanelMaestro onSalir={() => setRol(null)} />
  if (rol === 'estudiante') return <PanelEstudiante onSalir={() => setRol(null)} />
  return <Bienvenida onElegir={setRol} />
}