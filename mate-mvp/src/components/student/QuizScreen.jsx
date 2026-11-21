import { useState } from "react";

export default function QuizScreen({ questions, mode, onFinish }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const current = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  const handleSelect = (opcion) => {
    const nextAnswers = [
      ...answers,
      {
        questionId: current.id,
        isCorrect: opcion.correcta,
        errorId: opcion.error_id,
        targetError: current.target_error || null,
      },
    ];

    if (index + 1 < questions.length) {
      setAnswers(nextAnswers);
      setIndex(index + 1);
    } else {
      onFinish(nextAnswers);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 justify-between">
      <div>
        {/* Barra de progreso */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
          <span className="uppercase tracking-wider">
            {mode === "diagnostico" ? "Diagnóstico" : "Verificación final"}
          </span>
          <span>
            Pregunta {index + 1} de {questions.length}
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mb-8">
          <div
            className={`h-full transition-all duration-300 ${
              mode === "diagnostico" ? "bg-blue-600" : "bg-emerald-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Ecuación */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm mb-6">
          <p className="text-xs text-slate-400 uppercase font-semibold mb-2">
            Encuentra el valor de x
          </p>
          <p className="text-3xl font-mono font-bold text-slate-800 tracking-wide">
            {current.enunciado}
          </p>
        </div>

        {/* Opciones táctiles grandes */}
        <div className="grid grid-cols-2 gap-3">
          {current.opciones.map((op, i) => (
            <button
              key={i}
              onClick={() => handleSelect(op)}
              className="bg-white hover:bg-blue-50 active:bg-blue-100 border-2 border-slate-200 hover:border-blue-400 rounded-2xl py-5 px-4 text-xl font-mono font-bold text-slate-800 transition shadow-sm"
            >
              {op.texto}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        {mode === "diagnostico"
          ? "No pasa nada si fallas: esto nos dice exactamente qué reforzar."
          : "Demuestra lo que acabas de reforzar."}
      </p>
    </div>
  );
}