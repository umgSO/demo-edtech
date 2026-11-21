import { useState, useEffect } from 'react'
import { GRADOS } from './data'
import MonitorEnVivo from './MonitorEnVivo'
import './PanelMaestro.css'

export default function PanelMaestro({ onSalir }) {
  const [gradoId, setGradoId] = useState(GRADOS[0].id)
  const grado = GRADOS.find((g) => g.id === gradoId) || GRADOS[0]

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2>Panel del Docente</h2>
        <button onClick={onSalir} style={{ padding: '8px 14px', background: '#333', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          Cambiar de panel
        </button>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {GRADOS.map((g) => (
          <button
            key={g.id}
            onClick={() => setGradoId(g.id)}
            style={{
              padding: '10px 16px',
              borderRadius: 10,
              border: 'none',
              background: gradoId === g.id ? '#10b981' : '#e5e7eb',
              color: gradoId === g.id ? '#fff' : '#374151',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {g.nombre}
          </button>
        ))}
      </div>

      {gradoId === '1b' && <MonitorEnVivo />}

      <div style={{ background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <h3>Información del grupo: {grado.nombre}</h3>
        <p>Docente: {grado.docente}</p>
        <p>Estudiantes matriculados: {grado.alumnos.length}</p>
      </div>
    </div>
  )
}
