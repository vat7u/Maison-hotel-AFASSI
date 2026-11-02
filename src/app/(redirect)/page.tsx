import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Maison d'hôtes Afassi",
  robots: { index: false },
  icons: { icon: '/brand/logo-mark.png' },
};

// Static files cannot redirect by themselves, so "/" forwards to the French site.
// Once a host is chosen, a host-level redirect from / to /fr/ should replace this.
export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/fr/" />
      <a href="/fr/">Maison d'hôtes Afassi</a>
    </>
  );
}
