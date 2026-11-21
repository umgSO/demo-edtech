import { useState } from "react";
import { BookOpen, ArrowRight } from "lucide-react";

export default function JoinScreen({ tema, onStart }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState(tema.codigo_clase);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Escribe tu nombre para empezar.");
      return;
    }
    if (code.trim().toUpperCase() !== tema.codigo_clase) {
      setError(`Código no encontrado. Prueba con ${tema.codigo_clase}`);
      return;
    }
    onStart({ name: name.trim(), classCode: code.trim().toUpperCase() });
  };

  return (
    <div className="flex-1 flex flex-col justify-center p-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              {tema.grado}
            </p>
            <h2 className="text-lg font-bold text-slate-800">{tema.titulo}</h2>
          </div>
        </div>

        <p className="text-sm text-slate-600">
          Responde 6 preguntas rápidas para descubrir qué dominas y en qué paso
          necesitas refuerzo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tu nombre
            </label>
            <input
              type="text"
              placeholder="Ej. Carlos"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Código de clase
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono uppercase text-base"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition"
          >
            Empezar diagnóstico
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}