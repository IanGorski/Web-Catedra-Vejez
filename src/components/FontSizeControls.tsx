import { useEffect, useState } from 'react';

const FONT_KEY = 'fontSizePref';
const SIZES = [1, 1.15, 1.3]; // 100%, 115%, 130%
const TITLES = ['Tamaño normal', 'Tamaño mediano', 'Tamaño grande'];
const HINT_MS = 4200;

export default function FontSizeControls() {
  const [level, setLevel] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(FONT_KEY);
    if (saved) setLevel(Number(saved));
  }, []);

  useEffect(() => {
    setShowHint(true);
    const t = window.setTimeout(() => setShowHint(false), HINT_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', SIZES[level].toString());
    localStorage.setItem(FONT_KEY, String(level));
  }, [level]);

  function handleLevelCycle() {
    const nextLevel = (level + 1) % SIZES.length;
    setLevel(nextLevel);
    setShowHint(false);
  }

  return (
    <div className="font-size-controls-wrap" aria-label="Ajustar tamaño de letra">
      <button
        className={`font-size-toggle level-${level}`}
        aria-label={`Ajustar tamaño de letra. ${TITLES[level]}. Presionar para cambiar.`}
        title={`${TITLES[level]} (clic para cambiar)`}
        onClick={handleLevelCycle}
        type="button"
      >
        A
      </button>
      <span className={`font-size-inline-hint${showHint ? ' is-visible' : ''}`} aria-live="polite">
        Ajustar tamaño de texto
      </span>
    </div>
  );
}
