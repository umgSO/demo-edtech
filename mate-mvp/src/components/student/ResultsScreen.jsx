import { Trophy, Users, RotateCcw } from "lucide-react";

export default function ResultsScreen({
  student,
  diagResults,
  reevalResults,
  onGoTutor,
  onReset,
}) {
  const diagCorrect = diagResults.filter((a) => a.isCorrect).length;
  const diagPct = Math.round((diagCorrect / diagResults.length) * 100);

  const reevalCorrect = reevalResults.filter((a) => a.isCorrect).length;
  const reevalPct =
    reevalResults.length > 0
      ? Math.round((reevalCorrect / reevalResults.length) * 100)
      : 100;

  return (
    <div className="flex-1 p-5 flex flex-col justify-between gap-6">
      <div className="space-y-5">
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex bg-quetzal/15 text-quetzal p-4 rounded-full">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="font-titulo text-2xl font-bold text-hueso">
            ¡Buen trabajo, {student.name}!
          </h2>
          <p className="text-sm text-musgo">
            Así mejoró tu dominio después del refuerzo y la pausa activa:
          </p>
        </div>

        <div className="bg-selva-800 border border-selva-700 rounded-2xl p-5 space-y-4">
          <div>
            <div className="flex justify-between text-sm font-semibold mb-1.5">
              <span className="text-musgo">Diagnóstico inicial</span>
              <span className="text-jaguar">{diagPct}%</span>
            </div>
            <div className="w-full h-3 bg-selva-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-jaguar rounded-full"
                style={{ width: `${diagPct}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold mb-1.5">
              <span className="text-quetzal">Verificación final</span>
              <span className="text-quetzal">{reevalPct}%</span>
            </div>
            <div className="w-full h-3 bg-selva-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-quetzal rounded-full"
                style={{ width: `${reevalPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onGoTutor}
          className="w-full bg-quetzal hover:brightness-110 text-selva-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <Users className="w-5 h-5" />
          Practicar con alguien en casa (Modo Tutor)
        </button>

        <button
          onClick={onReset}
          className="w-full bg-selva-800 hover:bg-selva-700 border border-selva-700 text-hueso font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
