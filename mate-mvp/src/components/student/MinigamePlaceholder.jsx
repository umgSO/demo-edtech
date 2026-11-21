import { Gamepad2, ArrowRight } from "lucide-react";

export default function MinigamePlaceholder({ onFinish }) {
  return (
    <div className="flex-1 p-6 flex flex-col justify-center items-center text-center gap-5">
      <div className="bg-purple-100 text-purple-600 p-4 rounded-2xl">
        <Gamepad2 className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-800">
          Pausa activa (Modo difuso)
        </h2>
        <p className="text-sm text-slate-600">
          Descansa la mente 20 segundos para limpiar la memoria a corto plazo
          antes de comprobar si realmente dominaste el tema.
        </p>
      </div>

      {/* Aquí se incrustará el minijuego de Persona 3 */}
      <div className="w-full bg-white border-2 border-dashed border-purple-300 rounded-2xl p-8 text-xs text-purple-500 font-mono">
        [ Espacio reservado para el minijuego de P3 ]
      </div>

      <button
        onClick={onFinish}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2"
      >
        Terminar pausa e ir a verificación
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
