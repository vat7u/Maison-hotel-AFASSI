import { Allura, DM_Mono, EB_Garamond, Montserrat } from 'next/font/google';

// Downloaded at build time and served with the site. src/styles/fonts.css maps these
// variables onto the design system's font tokens.
const script = Allura({ weight: '400', subsets: ['latin'], variable: '--nf-script', display: 'swap' });
const label = DM_Mono({ weight: ['300', '400', '500'], subsets: ['latin'], variable: '--nf-label', display: 'swap' });
const body = EB_Garamond({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--nf-body',
  display: 'swap',
});
const display = Montserrat({
  weight: ['200', '300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--nf-display',
  display: 'swap',
});

export const fontVariables = [script, label, body, display].map(font => font.variable).join(' ');
