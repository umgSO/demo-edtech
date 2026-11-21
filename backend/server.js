const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Cargar el tema desde el JSON
const temaPath = path.join(__dirname, 'ecuaciones_1ro_basico.json');
const temaData = JSON.parse(fs.readFileSync(temaPath, 'utf8'));

// Estado en memoria precargado con 5 alumnos ficticios para que el Panel Docente
// se vea lleno y realista desde el segundo 1 de la demo
let temaActivo = true;
let resultadosSalón = [
  { estudiante: 'María López', antes: 33, despues: 100, errores_antes: ['err_signo', 'err_coeficiente'], errores_despues: [] },
  { estudiante: 'Carlos Pérez', antes: 50, despues: 100, errores_antes: ['err_signo'], errores_despues: [] },
  { estudiante: 'Ana Morales', antes: 33, despues: 67, errores_antes: ['err_signo', 'err_termino'], errores_despues: ['err_termino'] },
  { estudiante: 'Luis Gómez', antes: 67, despues: 100, errores_antes: ['err_coeficiente'], errores_despues: [] },
  { estudiante: 'Sofía Ruiz', antes: 50, despues: 100, errores_antes: ['err_signo'], errores_despues: [] }
];

// 1. GET /tema -> Devuelve el JSON del tema y si el docente lo activó
app.get('/tema', (req, res) => {
  res.json({ activo: temaActivo, tema: temaData });
});

// Extra útil para el switch del Panel Docente (Persona 3)
app.post('/tema/estado', (req, res) => {
  temaActivo = Boolean(req.body.activo);
  res.json({ activo: temaActivo });
});

// 2. POST /resultado -> Guarda el intento de un estudiante
app.post('/resultado', (req, res) => {
  const nuevo = req.body; // { estudiante, antes, despues, errores_antes, errores_despues }
  resultadosSalón.push(nuevo);
  res.status(201).json({ ok: true, total: resultadosSalón.length });
});

// 3. GET /resumen -> Devuelve estadísticas agregadas para el Panel Docente
app.get('/resumen', (req, res) => {
  const conteoErrores = { err_signo: 0, err_coeficiente: 0, err_termino: 0 };

  resultadosSalón.forEach((r) => {
    (r.errores_antes || []).forEach((err) => {
      if (conteoErrores[err] !== undefined) conteoErrores[err]++;
    });
  });

  res.json({
    activo: temaActivo,
    total_estudiantes: resultadosSalón.length,
    errores_frecuentes: conteoErrores,
    estudiantes: resultadosSalón
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});