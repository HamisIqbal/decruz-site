/**
 * Split a short heading into exactly two display lines. Prefers a sentence
 * boundary nearest the middle (so "A. B." breaks cleanly at the period);
 * otherwise falls back to the word break closest to the character midpoint.
 *
 * Used to force inner-page headings onto exactly two rows regardless of how the
 * proportional display font would otherwise wrap at a given viewport width.
 */
export function twoLines(input: string): [string, string] {
  const s = input.trim();

  const sentences = [...s.matchAll(/[.!?]\s+/g)];
  if (sentences.length) {
    const mid = s.length / 2;
    let cut = -1;
    let bestDiff = Infinity;
    for (const m of sentences) {
      const at = (m.index ?? 0) + m[0].length;
      const diff = Math.abs(at - mid);
      if (diff < bestDiff) {
        bestDiff = diff;
        cut = at;
      }
    }
    if (cut > 0 && cut < s.length) {
      return [s.slice(0, cut).trim(), s.slice(cut).trim()];
    }
  }

  const words = s.split(/\s+/);
  if (words.length < 2) return [s, ""];

  let best = 1;
  let bestDiff = Infinity;
  let acc = 0;
  for (let i = 0; i < words.length - 1; i++) {
    acc += words[i].length + 1;
    const diff = Math.abs(acc - (s.length - acc));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i + 1;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}
