type Photo = { src: string; alt: string };

// A group of framed photos. "band" is a row of three; "collage" is the staggered group whose
// placement lives in site.css. Add no state here: the page stays plain HTML.
export function PhotoCollage({ photos, layout }: { photos: Photo[]; layout: 'band' | 'collage' }) {
  return (
    <div className={`photo-${layout}`}>
      {photos.map((photo, i) => (
        <figure
          className={`frame${layout === 'band' && i === 1 ? ' frame-offset' : ''} fade`}
          key={photo.src}
        >
          <img src={photo.src} alt={photo.alt} loading="lazy" />
        </figure>
      ))}
    </div>
  );
}
