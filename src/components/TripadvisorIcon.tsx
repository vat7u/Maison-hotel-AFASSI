// Lucide has no Tripadvisor icon, so this one is drawn here. Decorative: the link around it
// carries the label.
export function TripadvisorIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="7" cy="13.5" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="13.5" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="13.5" r="1.1" fill="currentColor" />
      <circle cx="17" cy="13.5" r="1.1" fill="currentColor" />
      <path
        d="M1.5 8.8h3.6C7.2 7.3 9.5 6.6 12 6.6s4.8.7 6.9 2.2h3.6l-1.7 2.1M1.5 8.8l1.7 2.1M10.6 13.5 12 15.8l1.4-2.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
