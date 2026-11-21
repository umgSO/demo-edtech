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
    <div className="flex-1 flex flex-col justify-center p-5">
      <div className="bg-selva-800 border-l-4 border-zorro rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3.5">
          <div className="bg-selva-700 text-zorro p-3 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-zorro">
              {tema.grado}
            </p>
            <h2 className="font-titulo text-xl font-bold text-hueso">
              {tema.titulo}
            </h2>
          </div>
        </div>

        <p className="text-sm text-musgo leading-relaxed">
          Responde 6 preguntas rápidas para descubrir qué dominas y en qué paso
          necesitas refuerzo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-hueso mb-1.5">
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
              className="w-full px-4 py-3 rounded-xl bg-selva-900 border border-selva-700 text-hueso placeholder:text-musgo/70 focus:outline-none focus:ring-2 focus:ring-zorro text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-hueso mb-1.5">
              Código de clase
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-3 rounded-xl bg-selva-900 border border-selva-700 text-hueso focus:outline-none focus:ring-2 focus:ring-zorro font-mono uppercase text-base"
            />
          </div>

          {error && (
            <p className="text-sm text-red-300 bg-red-500/15 border border-red-400/40 px-3.5 py-2.5 rounded-xl">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-zorro hover:brightness-110 active:scale-[0.99] text-selva-900 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
          >
            Empezar diagnóstico
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
