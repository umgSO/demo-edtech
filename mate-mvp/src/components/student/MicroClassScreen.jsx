import { useState } from "react";
import { AlertCircle, CheckCircle2, Lightbulb, ArrowRight } from "lucide-react";

export default function MicroClassScreen({ detectedErrors, microClases, onFinish }) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const errorId = detectedErrors[idx];
  const clase = microClases[errorId];
  const isCorrect = selected?.correcta === true;

  const handleNext = () => {
    if (idx + 1 < detectedErrors.length) {
      setIdx(idx + 1);
      setSelected(null);
      setShowHint(false);
    } else {
      onFinish();
    }
  };

  return (
    <div className="flex-1 p-5 flex flex-col justify-between gap-5">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span className="text-amber-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> Refuerzo dirigido
          </span>
          <span>
            Tema {idx + 1} de {detectedErrors.length}
          </span>
        </div>

        {/* Tarjeta de teoría */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <span className="inline-block bg-red-50 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            Detectamos dificultad en: {clase.nombre_corto}
          </span>
          <h2 className="text-xl font-bold text-slate-800">{clase.titulo}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {clase.explicacion}
          </p>

          <div className="bg-slate-900 text-emerald-300 font-mono text-sm rounded-xl p-4 space-y-1.5">
            {clase.pasos_visuales.map((paso, i) => (
              <p key={i}>{paso}</p>
            ))}
          </div>
        </div>

        {/* Práctica guiada */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
            Práctica guiada
          </p>
          <p className="text-sm font-semibold text-slate-800">
            {clase.practica_guiada.pregunta}
          </p>

          <div className="space-y-2">
            {clase.practica_guiada.opciones.map((op, i) => {
              const isPicked = selected === op;
              let style = "bg-white border-slate-300 text-slate-800";
              if (isPicked && op.correcta) {
                style = "bg-emerald-50 border-emerald-500 text-emerald-800";
              } else if (isPicked && !op.correcta) {
                style = "bg-red-50 border-red-400 text-red-700";
              }

              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelected(op);
                    if (!op.correcta) setShowHint(true);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 font-mono text-sm font-semibold transition ${style}`}
                >
                  {op.texto}
                </button>
              );
            })}
          </div>

          {showHint && !isCorrect && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl">
              <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{clase.practica_guiada.pista}</p>
            </div>
          )}

          {isCorrect && (
            <div className="flex items-center gap-2 text-emerald-700 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              ¡Correcto! Ya dominaste este paso.
            </div>
          )}
        </div>
      </div>

      <button
        disabled={!isCorrect}
        onClick={handleNext}
        className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition bg-blue-600 text-white disabled:bg-slate-300 disabled:text-slate-500"
      >
        {idx + 1 < detectedErrors.length
          ? "Siguiente refuerzo"
          : "Ir a pausa activa (Minijuego)"}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
