import type { Metadata } from 'next';
import Link from '@/components/SiteLink';
import { PhotoCollage } from '@/components/PhotoCollage';
import type { Locale } from '@/i18n/config';
import { getMessages, type Messages } from '@/i18n/messages';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ lang: Locale }> };

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=70`;

// The guesthouse's own photos from the gallery (public/images/gallery/), chosen to sit with the
// blue town collage: the terrace, the arched lounge and breakfast at the top; breakfast with the
// town view, the blue-lit lounge and the blue breakfast table at the bottom.
const gallery = (n: number) => `/images/gallery/${String(n).padStart(2, '0')}.webp`;
const TOP_PHOTOS = [5, 10, 18].map(gallery);

// Temporary stand-ins of Chefchaouen, not the guesthouse. Real photos replace them before
// launch, along with their descriptions in the message files and the about.note line.

const COLLAGE_PHOTOS = [
  '1697549832166-cda403793609',
  '1772411535337-8a819ae04c31',
  '1756937216028-a8ad21318090',
  '1559200866-01e63948ca56',
  '1712354892729-3d60d036bf2a',
  '1542617453-65d7d65a38a5',
  '1772496924443-60d14639666b',
].map(photo);

const BOTTOM_PHOTOS = [11, 3, 9].map(gallery);

const withAlts = (photos: string[], alts: string[]) => photos.map((src, i) => ({ src, alt: alts[i] }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { meta } = getMessages(lang);
  return pageMetadata({
    lang,
    path: '/a-propos/',
    title: meta.aboutTitle,
    description: meta.aboutDescription,
    image: TOP_PHOTOS[0],
  });
}

function StorySection({ section }: { section: Messages['about']['sections'][number] }) {
  return (
    <section className="about-story fade">
      <h2 className="heading-script">{section.title}</h2>
      {section.paragraphs.map(text => <p key={text}>{text}</p>)}
    </section>
  );
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  const t = getMessages(lang).about;
  const [first, second, third] = t.sections;

  return (
    <main>
      <section className="page-hero">
        <p className="af-label hero-eyebrow">{t.eyebrow}</p>
        <h1>
          <span className="af-display page-hero-caps">{t.caps}</span>
          <span className="af-script page-hero-script">{t.script}</span>
        </h1>
      </section>

      <div className="about">
        <div className="container">
          <PhotoCollage photos={withAlts(TOP_PHOTOS, t.topAlts)} layout="band" />
          <StorySection section={first} />
          <PhotoCollage photos={withAlts(COLLAGE_PHOTOS, t.collageAlts)} layout="collage" />
          <p className="about-note">{t.note}</p>
          <StorySection section={second} />
          <PhotoCollage photos={withAlts(BOTTOM_PHOTOS, t.bottomAlts)} layout="band" />
          <StorySection section={third} />

          <section className="about-closing fade">
            <p className="about-closing-text">{t.closing}</p>
            <p>{t.direct}</p>
            <div className="about-actions">
              <Link href={`/${lang}/#reserver`} className="btn btn-primary">{t.cta}</Link>
              <Link href={`/${lang}/#chambres`} className="btn btn-outline">{t.roomsLink}</Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
