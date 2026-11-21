import { useState } from "react";
import { Users, CheckCircle2, Lightbulb, Award } from "lucide-react";

export default function TutorModeScreen({
  detectedErrors,
  microClases,
  onDone,
}) {
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
        <div className="bg-quetzal/15 text-quetzal p-5 rounded-full">
          <Award className="w-12 h-12" />
        </div>
        <h2 className="font-titulo text-2xl font-bold text-hueso">
          ¡Tema dominado en familia!
        </h2>
        <p className="text-sm text-musgo max-w-md">
          Explicarlo con sus propias palabras confirma que realmente lo entendió
          y no solo lo memorizó.
        </p>
        <button
          onClick={onDone}
          className="w-full max-w-sm bg-quetzal hover:brightness-110 text-selva-900 font-bold py-3.5 rounded-xl transition cursor-pointer"
        >
          Finalizar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 p-5 flex flex-col justify-between gap-5">
      <div className="space-y-4">
        <div className="bg-quetzal/15 border border-quetzal/40 text-hueso rounded-2xl p-4 flex items-center gap-3">
          <Users className="w-6 h-6 shrink-0 text-quetzal" />
          <p className="text-xs font-medium leading-snug">
            <strong className="text-quetzal">Modo Tutor en Casa:</strong> Pásale
            este teléfono a mamá, papá o un acompañante. No necesita saber
            matemáticas.
          </p>
        </div>

        <div className="bg-selva-800 border border-selva-700 rounded-2xl p-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-quetzal">
            Paso 1 · Pregúntale en voz alta
          </p>
          <p className="font-titulo text-xl font-bold text-hueso leading-snug">
            “{guia.pregunta_para_tutor}”
          </p>

          <div className="bg-quetzal/10 border border-quetzal/35 rounded-xl p-3.5">
            <p className="text-xs font-bold text-quetzal mb-1">
              Qué buscar en su respuesta:
            </p>
            <p className="text-sm text-hueso">
              {guia.que_buscar || guia.si_entendio}
            </p>
          </div>

          {showHint && (
            <div className="bg-jaguar/15 border border-jaguar/40 rounded-xl p-3.5 flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-jaguar shrink-0 mt-0.5" />
              <p className="text-sm text-hueso">
                {guia.pista_si_se_traba || guia.si_no_entendio}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2.5">
        <button
          onClick={handleValidated}
          className="w-full bg-quetzal hover:brightness-110 text-selva-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <CheckCircle2 className="w-5 h-5" />
          Sí lo explicó bien
        </button>

        <button
          onClick={() => setShowHint(true)}
          className="w-full bg-selva-800 hover:bg-selva-700 border border-jaguar/50 text-jaguar font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition cursor-pointer"
        >
          <Lightbulb className="w-4 h-4" />
          Se trabó — Ver pista para leerle
        </button>
      </div>
    </div>
  );
}
