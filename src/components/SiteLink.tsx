import NextLink from 'next/link';
import type { ComponentProps } from 'react';

// Use this instead of next/link. Background prefetching asks for files a static export does
// not name the way it expects, which fills the console with 404s, so it stays off.
export default function SiteLink(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
