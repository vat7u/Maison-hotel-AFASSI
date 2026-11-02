import type { ReactNode } from 'react';

// Root layout for the bare "/" address only. Every real page lives under [lang].
export default function RedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
