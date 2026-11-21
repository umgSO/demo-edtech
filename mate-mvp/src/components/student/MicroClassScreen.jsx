import { useState } from "react";
import { AlertCircle, CheckCircle2, Lightbulb, ArrowRight } from "lucide-react";

export default function MicroClassScreen({
  detectedErrors,
  microClases,
  onFinish,
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const errorId = detectedErrors[idx];
  const clase = microClases[errorId] || Object.values(microClases)[0];

  const pasos = Array.isArray(clase.pasos_visuales)
    ? clase.pasos_visuales
    : clase.ejemplo_visual
    ? [clase.ejemplo_visual]
    : [];

  const pg = clase.practica_guiada || {};
  const opciones = Array.isArray(pg.opciones)
    ? pg.opciones
    : [
        { texto: pg.correcta || "Opción correcta", correcta: true },
        { texto: pg.distractor || "Opción incorrecta", correcta: false },
      ];

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
        <div className="flex items-center justify-between text-xs font-semibold text-musgo">
          <span className="text-jaguar flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" /> Refuerzo dirigido
          </span>
          <span>
            Tema {idx + 1} de {detectedErrors.length}
          </span>
        </div>

        <div className="bg-selva-800 border border-selva-700 rounded-2xl p-5 space-y-3">
          <span className="inline-block bg-zorro/15 text-zorro text-xs font-semibold px-3 py-1 rounded-full">
            Detectamos dificultad en: {clase.nombre_corto || errorId}
          </span>
          <h2 className="font-titulo text-xl font-bold text-hueso">
            {clase.titulo}
          </h2>
          <p className="text-sm text-musgo leading-relaxed">
            {clase.explicacion}
          </p>

          {pasos.length > 0 && (
            <div className="bg-selva-900 border border-selva-700 text-quetzal font-mono text-sm rounded-xl p-4 space-y-1.5">
              {pasos.map((paso, i) => (
                <p key={i}>{paso}</p>
              ))}
            </div>
          )}
        </div>

        <div className="bg-selva-800 border-l-4 border-guacamaya rounded-2xl p-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-guacamaya">
            Práctica guiada
          </p>
          <p className="text-sm font-semibold text-hueso">{pg.pregunta}</p>

          <div className="space-y-2.5">
            {opciones.map((op, i) => {
              const isPicked = selected === op;
              let style =
                "bg-selva-900 border-selva-700 text-hueso hover:border-musgo";
              if (isPicked && op.correcta) {
                style = "bg-quetzal/15 border-quetzal text-quetzal";
              } else if (isPicked && !op.correcta) {
                style = "bg-red-500/15 border-red-400 text-red-300";
              }

              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelected(op);
                    if (!op.correcta) setShowHint(true);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 font-mono text-sm font-semibold transition cursor-pointer ${style}`}
                >
                  {op.texto}
                </button>
              );
            })}
          </div>

          {showHint && !isCorrect && (
            <div className="flex items-start gap-2 bg-jaguar/15 border border-jaguar/40 text-jaguar text-xs p-3.5 rounded-xl">
              <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
              <p>
                {pg.pista ||
                  "Revisa el ejemplo de arriba y recuerda aplicar la operación opuesta."}
              </p>
            </div>
          )}

          {isCorrect && (
            <div className="flex items-center gap-2 text-quetzal text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5" />
              ¡Correcto! Ya dominaste este paso.
            </div>
          )}
        </div>
      </div>

      <button
        disabled={!isCorrect}
        onClick={handleNext}
        className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition bg-zorro hover:brightness-110 text-selva-900 disabled:bg-selva-700 disabled:text-musgo cursor-pointer disabled:cursor-not-allowed"
      >
        {idx + 1 < detectedErrors.length
          ? "Siguiente refuerzo"
          : "Ir a pausa activa (Minijuego)"}
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
