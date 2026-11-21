// Datos de ejemplo. Luego los puedes reemplazar por tu API o base de datos.
export const GRADOS = [
  {
    id: '1ero',
    nombre: '1ero básico',
    animal: 'Zorro',
    emoji: '🦊',
    color: '#E8873A',
    estudiantes: [
      { id: 1, nombre: 'Ana Lucía Morales', promedio: 92, asistencia: 98 },
      { id: 2, nombre: 'Diego Ajú', promedio: 78, asistencia: 91 },
      { id: 3, nombre: 'María José Pérez', promedio: 85, asistencia: 95 },
      { id: 4, nombre: 'Kevin Tzoc', promedio: 64, asistencia: 82 },
      { id: 5, nombre: 'Sofía Hernández', promedio: 88, asistencia: 100 },
    ],
    tareas: [
      { id: 1, titulo: 'Ejercicios de conjuntos', entrega: '24 nov', entregadas: 5, total: 5, estado: 'por-calificar' },
      { id: 2, titulo: 'Problemas con números enteros', entrega: '28 nov', entregadas: 3, total: 5, estado: 'abierta' },
      { id: 3, titulo: 'Quiz de fracciones', entrega: '14 nov', entregadas: 5, total: 5, estado: 'calificada' },
    ],
    temas: [
      { id: 1, titulo: 'Conjuntos', avance: 100, subtemas: [{ t: 'Pertenencia e inclusión', hecho: true }, { t: 'Unión e intersección', hecho: true }, { t: 'Diagramas de Venn', hecho: true }] },
      { id: 2, titulo: 'Números enteros', avance: 70, subtemas: [{ t: 'Recta numérica', hecho: true }, { t: 'Suma y resta', hecho: true }, { t: 'Multiplicación y división', hecho: false }] },
      { id: 3, titulo: 'Fracciones', avance: 40, subtemas: [{ t: 'Fracciones equivalentes', hecho: true }, { t: 'Suma de fracciones', hecho: false }, { t: 'Problemas con fracciones', hecho: false }] },
      { id: 4, titulo: 'Potencias y raíces', avance: 0, subtemas: [{ t: 'Propiedades de las potencias', hecho: false }, { t: 'Raíz cuadrada', hecho: false }] },
    ],
  },
  {
    id: '2do',
    nombre: '2do básico',
    animal: 'Quetzal',
    emoji: '🐦',
    color: '#4FB783',
    estudiantes: [
      { id: 1, nombre: 'Carlos Xol', promedio: 81, asistencia: 94 },
      { id: 2, nombre: 'Valeria Gómez', promedio: 95, asistencia: 99 },
      { id: 3, nombre: 'Josué Cano', promedio: 70, asistencia: 88 },
      { id: 4, nombre: 'Daniela Ixcoy', promedio: 86, asistencia: 96 },
      { id: 5, nombre: 'Luis Fernando Rivera', promedio: 59, asistencia: 79 },
    ],
    tareas: [
      { id: 1, titulo: 'Razones y proporciones', entrega: '23 nov', entregadas: 4, total: 5, estado: 'por-calificar' },
      { id: 2, titulo: 'Ecuaciones de primer grado', entrega: '30 nov', entregadas: 1, total: 5, estado: 'abierta' },
      { id: 3, titulo: 'Perímetros y áreas', entrega: '12 nov', entregadas: 5, total: 5, estado: 'calificada' },
    ],
    temas: [
      { id: 1, titulo: 'Razones y proporciones', avance: 90, subtemas: [{ t: 'Razón entre dos números', hecho: true }, { t: 'Regla de tres simple', hecho: true }, { t: 'Proporcionalidad inversa', hecho: false }] },
      { id: 2, titulo: 'Ecuaciones lineales', avance: 50, subtemas: [{ t: 'Despeje de incógnitas', hecho: true }, { t: 'Problemas con ecuaciones', hecho: false }] },
      { id: 3, titulo: 'Geometría plana', avance: 100, subtemas: [{ t: 'Triángulos y cuadriláteros', hecho: true }, { t: 'Perímetros y áreas', hecho: true }] },
      { id: 4, titulo: 'Estadística', avance: 20, subtemas: [{ t: 'Media, moda y mediana', hecho: true }, { t: 'Gráficas de barras', hecho: false }, { t: 'Probabilidad básica', hecho: false }] },
    ],
  },
  {
    id: '3ro',
    nombre: '3ro básico',
    animal: 'Guacamaya',
    emoji: '🦜',
    color: '#4C8FD6',
    estudiantes: [
      { id: 1, nombre: 'Andrea Sicán', promedio: 90, asistencia: 97 },
      { id: 2, nombre: 'Marvin López', promedio: 74, asistencia: 90 },
      { id: 3, nombre: 'Gabriela Castillo', promedio: 83, asistencia: 93 },
      { id: 4, nombre: 'Pedro Coy', promedio: 67, asistencia: 85 },
      { id: 5, nombre: 'Camila Barrios', promedio: 97, asistencia: 100 },
    ],
    tareas: [
      { id: 1, titulo: 'Factorización de polinomios', entrega: '25 nov', entregadas: 5, total: 5, estado: 'por-calificar' },
      { id: 2, titulo: 'Sistemas de ecuaciones 2x2', entrega: '2 dic', entregadas: 0, total: 5, estado: 'abierta' },
      { id: 3, titulo: 'Teorema de Pitágoras', entrega: '10 nov', entregadas: 5, total: 5, estado: 'calificada' },
    ],
    temas: [
      { id: 1, titulo: 'Polinomios', avance: 80, subtemas: [{ t: 'Operaciones con polinomios', hecho: true }, { t: 'Productos notables', hecho: true }, { t: 'Factorización', hecho: false }] },
      { id: 2, titulo: 'Sistemas de ecuaciones', avance: 30, subtemas: [{ t: 'Método de sustitución', hecho: true }, { t: 'Método de igualación', hecho: false }, { t: 'Método gráfico', hecho: false }] },
      { id: 3, titulo: 'Teorema de Pitágoras', avance: 100, subtemas: [{ t: 'Triángulos rectángulos', hecho: true }, { t: 'Aplicaciones', hecho: true }] },
      { id: 4, titulo: 'Trigonometría básica', avance: 0, subtemas: [{ t: 'Seno, coseno y tangente', hecho: false }, { t: 'Problemas de ángulos', hecho: false }] },
    ],
  },
]