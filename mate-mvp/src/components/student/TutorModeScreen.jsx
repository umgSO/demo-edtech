import { useState } from "react";
import { Users, CheckCircle2, Lightbulb, Award } from "lucide-react";

export default function TutorModeScreen({ detectedErrors, microClases, onDone }) {
  const keys =
    detectedErrors.length > 0 ? detectedErrors : [Object.keys(microClases)[0]];

  const [idx, setIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [finished, setFinished] = useState(false);

  const clase = microClases[keys[idx]];
  const guia = clase.guia_tutor_casa;

  const handleValidated = () => {
    if (idx + 1 < keys.length) {
      setIdx(idx + 1);
      setShowHint(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="flex-1 p-6 flex flex-col justify-center items-center text-center gap-5">
        <div className="bg-indigo-100 text-indigo-600 p-5 rounded-full">
          <Award className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">
          ¡Tema dominado en familia!
        </h2>
        <p className="text-sm text-slate-600">
          Explicarlo con sus propias palabras confirma que realmente lo entendió
          y no solo lo memorizó.
        </p>
        <button
          onClick={onDone}
          className="w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-xl"
        >
          Finalizar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-5 flex flex-col justify-between gap-5">
      <div className="space-y-4">
        <div className="bg-indigo-600 text-white rounded-2xl p-4 flex items-center gap-3">
          <Users className="w-6 h-6 shrink-0" />
          <p className="text-xs font-medium leading-snug">
            <strong>Modo Tutor en Casa:</strong> Pásale este teléfono a mamá,
            papá o un acompañante. No necesita saber matemáticas.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Paso 1 · Pregúntale en voz alta
          </p>
          <p className="text-lg font-bold text-slate-800 leading-snug">
            “{guia.pregunta_para_tutor}”
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
            <p className="text-xs font-bold text-emerald-800 mb-1">
              Qué buscar en su respuesta:
            </p>
            <p className="text-sm text-emerald-900">{guia.que_buscar}</p>
          </div>

          {showHint && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900">{guia.pista_si_se_traba}</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2.5">
        <button
          onClick={handleValidated}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          Sí lo explicó bien
        </button>

        <button
          onClick={() => setShowHint(true)}
          className="w-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
        >
          <Lightbulb className="w-4 h-4" />
          Se trabó — Ver pista para leerle
        </button>
      </div>
    </div>
  );
}
