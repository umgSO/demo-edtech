import { GRADOS } from './data'

// Fecha de referencia para el calendario de ejemplo
export const HOY = '2026-11-21'

const grado = GRADOS.find((g) => g.id === '1ero')

export const ESTUDIANTE = {
  nombre: 'Ana Lucía Morales',
  grado: grado.nombre,
  grupo: grado.animal,
  emoji: grado.emoji,
  color: grado.color,
  companeros: grado.estudiantes.map((e) => e.nombre).filter((n) => n !== 'Ana Lucía Morales'),
}

export const MATERIAS = [
  { id: 'mate', nombre: 'Matemáticas', docente: 'Profa. Rivera', color: '#E8873A', emoji: '🦊', temas: grado.temas },
  {
    id: 'comu', nombre: 'Comunicación y Lenguaje', docente: 'Prof. Castillo', color: '#4C8FD6', emoji: '🦜',
    temas: [
      { id: 1, titulo: 'Textos narrativos', avance: 80 },
      { id: 2, titulo: 'Ortografía y tildes', avance: 55 },
      { id: 3, titulo: 'Comprensión lectora', avance: 30 },
    ],
  },
  {
    id: 'cien', nombre: 'Ciencias Naturales', docente: 'Profa. Ixcoy', color: '#4FB783', emoji: '🐢',
    temas: [
      { id: 1, titulo: 'La célula', avance: 100 },
      { id: 2, titulo: 'Ecosistemas de Guatemala', avance: 45 },
      { id: 3, titulo: 'El ciclo del agua', avance: 0 },
    ],
  },
  {
    id: 'soc', nombre: 'Ciencias Sociales', docente: 'Prof. Pérez', color: '#D9A441', emoji: '🐆',
    temas: [
      { id: 1, titulo: 'La civilización maya', avance: 70 },
      { id: 2, titulo: 'Regiones de Guatemala', avance: 60 },
    ],
  },
  {
    id: 'ing', nombre: 'Inglés', docente: 'Miss Taylor', color: '#D9627F', emoji: '🦩',
    temas: [
      { id: 1, titulo: 'Present simple', avance: 75 },
      { id: 2, titulo: 'Family vocabulary', avance: 40 },
    ],
  },
  {
    id: 'art', nombre: 'Expresión Artística', docente: 'Profa. Gómez', color: '#9C7BD6', emoji: '🦋',
    temas: [
      { id: 1, titulo: 'Color y textura', avance: 90 },
      { id: 2, titulo: 'Dibujo de fauna', avance: 25 },
    ],
  },
]

// estado: 'pendiente' | 'entregada' | 'calificada'
export const TAREAS_INICIALES = [
  { id: 1, materiaId: 'mate', titulo: 'Problemas con números enteros', fecha: '2026-11-28', estado: 'pendiente' },
  { id: 2, materiaId: 'mate', titulo: 'Ejercicios de conjuntos', fecha: '2026-11-24', estado: 'entregada' },
  { id: 3, materiaId: 'mate', titulo: 'Quiz de fracciones', fecha: '2026-11-14', estado: 'calificada', nota: 90 },
  { id: 4, materiaId: 'mate', titulo: 'Prueba de conjuntos', fecha: '2026-11-05', estado: 'calificada', nota: 94 },
  { id: 5, materiaId: 'comu', titulo: 'Resumen de lectura', fecha: '2026-11-26', estado: 'pendiente' },
  { id: 6, materiaId: 'comu', titulo: 'Dictado de ortografía', fecha: '2026-11-12', estado: 'calificada', nota: 85 },
  { id: 7, materiaId: 'cien', titulo: 'Informe del ecosistema', fecha: '2026-11-30', estado: 'pendiente' },
  { id: 8, materiaId: 'cien', titulo: 'Cuestionario de la célula', fecha: '2026-11-10', estado: 'calificada', nota: 92 },
  { id: 9, materiaId: 'soc', titulo: 'Línea del tiempo maya', fecha: '2026-11-25', estado: 'entregada' },
  { id: 10, materiaId: 'soc', titulo: 'Mapa de regiones', fecha: '2026-11-09', estado: 'calificada', nota: 88 },
  { id: 11, materiaId: 'ing', titulo: 'Family vocabulary quiz', fecha: '2026-11-27', estado: 'pendiente' },
  { id: 12, materiaId: 'art', titulo: 'Dibujo de un quetzal', fecha: '2026-12-01', estado: 'pendiente' },
  { id: 13, materiaId: 'art', titulo: 'Collage de texturas', fecha: '2026-11-11', estado: 'calificada', nota: 95 },
]

export const EVENTOS = [
  { id: 1, materiaId: 'mate', titulo: 'Examen de fracciones', fecha: '2026-11-27' },
  { id: 2, materiaId: 'cien', titulo: 'Feria de ciencias', fecha: '2026-11-26' },
  { id: 3, materiaId: 'cien', titulo: 'Examen de la célula y ecosistemas', fecha: '2026-12-03' },
]

export const AVISOS_INICIALES = [
  { id: 1, materiaId: 'mate', texto: 'Traer regla y compás para la clase de mañana.', hace: 'Hace 2 horas', leido: false },
  { id: 2, materiaId: 'cien', texto: 'La feria de ciencias será en el patio central.', hace: 'Hace 5 horas', leido: false },
  { id: 3, materiaId: 'comu', texto: 'Ya están disponibles las notas del dictado.', hace: 'Ayer', leido: false },
  { id: 4, materiaId: 'ing', texto: 'El quiz de vocabulario cubre las páginas 12 a 15.', hace: 'Hace 2 días', leido: true },
  { id: 5, materiaId: 'art', texto: 'Pueden usar acuarela o crayones para el quetzal.', hace: 'Hace 3 días', leido: true },
]