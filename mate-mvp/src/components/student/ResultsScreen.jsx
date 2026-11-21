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
    <div className="flex-1 p-6 flex flex-col justify-between gap-6">
      <div className="space-y-5">
        <div className="text-center space-y-2">
          <div className="inline-flex bg-emerald-100 text-emerald-600 p-4 rounded-full">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">
            ¡Buen trabajo, {student.name}!
          </h2>
          <p className="text-sm text-slate-600">
            Así mejoró tu dominio después del refuerzo y la pausa activa:
          </p>
        </div>

        {/* Comparativo Antes vs Después */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <div className="flex justify-between text-sm font-semibold mb-1">
              <span className="text-slate-600">Diagnóstico inicial</span>
              <span className="text-slate-800">{diagPct}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${diagPct}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-semibold mb-1">
              <span className="text-emerald-700">Verificación final</span>
              <span className="text-emerald-700">{reevalPct}%</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${reevalPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={onGoTutor}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center gap-2 shadow-sm"
        >
          <Users className="w-5 h-5" />
          Practicar con alguien en casa (Modo Tutor)
        </button>

        <button
          onClick={onReset}
          className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
