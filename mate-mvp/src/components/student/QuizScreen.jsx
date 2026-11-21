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
    <div className="flex-1 flex flex-col p-5 justify-between">
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-musgo mb-2">
          <span className="uppercase tracking-wider">
            {mode === "diagnostico" ? "Diagnóstico" : "Verificación final"}
          </span>
          <span>
            Pregunta {index + 1} de {questions.length}
          </span>
        </div>

        <div className="w-full h-2.5 bg-selva-700 rounded-full overflow-hidden mb-8">
          <div
            className={`h-full transition-all duration-300 ${
              mode === "diagnostico" ? "bg-zorro" : "bg-quetzal"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-selva-800 border border-selva-700 rounded-2xl p-8 text-center mb-6">
          <p className="text-xs text-musgo uppercase font-semibold tracking-wider mb-2">
            Encuentra el valor de x
          </p>
          <p className="text-3xl sm:text-4xl font-mono font-bold text-hueso tracking-wide">
            {current.enunciado}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {current.opciones.map((op, i) => (
            <button
              key={i}
              onClick={() => handleSelect(op)}
              className="bg-selva-800 hover:bg-selva-700 active:scale-[0.98] border-2 border-selva-700 hover:border-zorro rounded-2xl py-5 px-4 text-xl font-mono font-bold text-hueso transition cursor-pointer"
            >
              {op.texto}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-musgo mt-6">
        {mode === "diagnostico"
          ? "No pasa nada si fallas: esto nos dice exactamente qué reforzar."
          : "Demuestra lo que acabas de reforzar."}
      </p>
    </div>
  );
}
