import { useState, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

const BASE_CARDS = [
  { id: 1, pair: "zorro", emoji: "🦊" },
  { id: 2, pair: "zorro", emoji: "🦊" },
  { id: 3, pair: "quetzal", emoji: "🐦" },
  { id: 4, pair: "quetzal", emoji: "🐦" },
  { id: 5, pair: "guacamaya", emoji: "🦜" },
  { id: 6, pair: "guacamaya", emoji: "🦜" },
];

export default function MinigamePlaceholder({ onFinish }) {
  const [cards] = useState(() =>
    [...BASE_CARDS].sort(() => Math.random() - 0.5)
  );
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    if (cards[a].pair === cards[b].pair) {
      setMatched((m) => [...m, cards[a].pair]);
      setFlipped([]);
    } else {
      const t = setTimeout(() => setFlipped([]), 650);
      return () => clearTimeout(t);
    }
  }, [flipped, cards]);

  const won = matched.length === 3;

  const handleFlip = (i) => {
    if (
      flipped.length === 2 ||
      flipped.includes(i) ||
      matched.includes(cards[i].pair)
    ) {
      return;
    }
    setFlipped((f) => [...f, i]);
  };

  return (
    <div className="flex-1 p-6 flex flex-col justify-between items-center text-center gap-5">
      <div className="space-y-1.5">
        <span className="inline-flex items-center gap-1.5 bg-jaguar/15 text-jaguar text-xs font-bold px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" /> Pausa activa · Modo difuso
        </span>
        <h2 className="font-titulo text-2xl font-bold text-hueso">
          Encuentra los 3 pares de fauna
        </h2>
        <p className="text-sm text-musgo">
          Despeja tu mente 15 segundos antes de la verificación final.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3.5 w-full max-w-xs">
        {cards.map((card, i) => {
          const isOpen = flipped.includes(i) || matched.includes(card.pair);
          return (
            <button
              key={card.id}
              onClick={() => handleFlip(i)}
              className={`aspect-square rounded-2xl text-4xl flex items-center justify-center border-2 transition-all cursor-pointer ${
                isOpen
                  ? "bg-selva-700 border-quetzal scale-100"
                  : "bg-selva-800 border-selva-700 hover:border-zorro active:scale-95"
              }`}
            >
              {isOpen ? card.emoji : "🐾"}
            </button>
          );
        })}
      </div>

      <div className="w-full">
        <button
          onClick={onFinish}
          className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
            won
              ? "bg-quetzal hover:brightness-110 text-selva-900"
              : "bg-zorro hover:brightness-110 text-selva-900"
          }`}
        >
          {won
            ? "¡Mente fresca! Ir a verificación"
            : "Saltar pausa e ir a verificación"}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
