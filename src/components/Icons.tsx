export function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Logo oficial (FeaT & Co). No fundo escuro é invertido. */
export function Wordmark({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/img/logo.png"
      alt="FeaT&Co"
      width={900}
      height={190}
      className={`${className} select-none ${invert ? "invert mix-blend-screen" : "mix-blend-multiply"}`}
      draggable={false}
    />
  );
}
