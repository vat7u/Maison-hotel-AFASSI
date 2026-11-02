const STAR = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z';

function StarRow() {
  return (
    <svg viewBox="0 0 120 24" aria-hidden="true">
      {[0, 1, 2, 3, 4].map(i => (
        <g transform={`translate(${i * 24} 0)`} key={i}><path d={STAR} /></g>
      ))}
    </svg>
  );
}

// Five stars; the gold layer is clipped to score / scale (mirrors in right-to-left)
export function Stars({ score, scale }: { score: number; scale: number }) {
  return (
    <span className="stars" aria-hidden="true">
      <span className="stars-base"><StarRow /></span>
      <span className="stars-fill" style={{ width: `${Math.min(100, (score / scale) * 100)}%` }}>
        <StarRow />
      </span>
    </span>
  );
}
