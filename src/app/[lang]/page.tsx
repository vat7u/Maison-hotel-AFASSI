import type { Metadata } from 'next';
import { Announcement } from '@/components/Announcement';
import { BookingProvider } from '@/components/BookingContext';
import { BookingSection } from '@/components/BookingSection';
import { GallerySlider } from '@/components/GallerySlider';
import { HeroSlider } from '@/components/HeroSlider';
import { PartnerSlider } from '@/components/PartnerSlider';
import { PostCard } from '@/components/PostCard';
import { ReviewsSection } from '@/components/ReviewsSection';
import { RoomsSection } from '@/components/RoomsSection';
import Link from '@/components/SiteLink';
import { getRooms } from '@/content/rooms';
import { INSTAGRAM_URL } from '@/content/site';
import type { Locale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { getPosts, toSummary } from '@/lib/journal';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ lang: Locale }> };

const HERO_IMAGES = [
  { src: '/images/hero/moto-chefchaouen.webp', position: '30% 50%' },
  { src: '/images/hero/entrance.webp', position: '50% 55%' },
  { src: '/images/hero/lobby.webp', position: '50% 50%' },
  { src: '/images/hero/night-view.webp', position: '50% 60%' },
  {
    src: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?auto=format&fit=crop&w=2200&q=80',
    position: '50% 60%',
  },
];

// The guesthouse's own photos, taken from the gallery: the terrace at sunset behind two framed
// photos that overlap (the blue terrace, the blue door with the house sign).
const STORY_BACKGROUND = '/images/gallery/15.webp';
const STORY_PHOTOS = ['/images/gallery/04.webp', '/images/gallery/06.webp'];

// The guesthouse's own photos (public/images/gallery/01.webp to 18.webp), then three town photos
// kept from Unsplash. Sets of 7: in each, the 4th photo fills the tall middle space. The count
// must stay a multiple of 7.
const GALLERY = [
  ...Array.from({ length: 18 }, (_, i) => `/images/gallery/${String(i + 1).padStart(2, '0')}.webp`),
  ...['photo-1654683407553-6925e9caed55', 'photo-1770373815846-c4758cfe5e98', 'photo-1719772677131-a04070b6c755'].map(
    id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`,
  ),
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { meta } = getMessages(lang);
  return pageMetadata({
    lang,
    path: '/',
    title: meta.homeTitle,
    description: meta.homeDescription,
    image: HERO_IMAGES[0].src,
  });
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const m = getMessages(lang);
  const rooms = getRooms(lang);
  const latest = getPosts(lang).slice(0, 3).map(post => toSummary(post, lang));
  const slides = HERO_IMAGES.map((image, i) => ({ ...image, alt: m.hero.slides[i] }));

  return (
    <>
      <Announcement text={m.announcement.text} closeLabel={m.announcement.close} />
      <BookingProvider initialRoom={rooms[0].id}>
        <main>
          <HeroSlider slides={slides} dotsLabel={m.hero.dotsLabel} dotLabel={m.hero.dotLabel}>
            <div className="hero-inner fade">
              <p className="af-label hero-eyebrow">{m.hero.eyebrow}</p>
              <h1>
                <span className="af-display hero-caps">{m.hero.caps}</span>
                <span className="af-script hero-script">{m.hero.script}</span>
              </h1>
              <a href="#reserver" className="btn btn-gold btn-hero">{m.hero.cta}</a>
            </div>
          </HeroSlider>

          <section className="story">
            <div className="story-text fade">
              <div className="heading">
                <p className="heading-eyebrow">{m.story.eyebrow}</p>
                <h2 className="heading-script">{m.story.title}</h2>
                <p className="heading-body">{m.story.body}</p>
                <p className="heading-body"><b>{m.story.access}</b></p>
              </div>
              <Link href={`/${lang}/a-propos/`} className="btn btn-primary">{m.story.cta}</Link>
            </div>
            <div className="story-photos">
              <img className="story-bg" src={STORY_BACKGROUND} alt="" loading="lazy" />
              <figure className="frame story-frame fade">
                <img src={STORY_PHOTOS[0]} alt={m.story.photo1Alt} loading="lazy" />
              </figure>
              <figure className="frame story-frame fade">
                <img src={STORY_PHOTOS[1]} alt={m.story.photo2Alt} loading="lazy" />
              </figure>
            </div>
          </section>

          <section className="partners" aria-labelledby="partners-title">
            <p className="partners-title" id="partners-title">{m.partners.title}</p>
            <PartnerSlider />
          </section>

          <RoomsSection rooms={rooms} t={m.rooms} />
          <ReviewsSection lang={lang} m={m} />
          <BookingSection lang={lang} rooms={rooms} t={m.booking} roomText={m.rooms} />

          <section className="journal-teaser" id="journal">
            <div className="container">
              <div className="heading heading-center fade">
                <p className="heading-eyebrow">{m.journal.eyebrow}</p>
                <h2 className="heading-script">{m.journal.teaserTitle}</h2>
              </div>
              <div className="post-grid">
                {latest.map(post => (
                  <PostCard post={post} lang={lang} readMore={m.journal.readMore} key={post.slug} />
                ))}
              </div>
              <div className="journal-more">
                <a href={`/${lang}/journal/`} className="btn btn-outline">{m.journal.allPosts}</a>
              </div>
            </div>
          </section>

          <section className="gallery">
            <GallerySlider photos={GALLERY.map((src, i) => ({ src, alt: m.gallery.alts[i] }))} />
            <a href={INSTAGRAM_URL} className="af-label gallery-link" target="_blank" rel="noopener">
              {m.gallery.instagram}
            </a>
          </section>
        </main>
      </BookingProvider>
    </>
  );
}
