/*
  JOURNAL — every blog post lives in this file (until a CMS replaces it).

  To add a post, copy one { ... } block below, paste it into the list, and change:
    slug      the post's address: lowercase, words joined by dashes (/fr/journal/your-slug/)
    title     the headline
    date      "YYYY-MM-DD" — posts are shown newest first
    category  one of: "Conseils", "Cuisine", "Balades", "Moto" (a new word creates a new filter tab)
    image     a photo link, or a file in public/images/blog/ (write "/images/blog/my-photo.jpg")
    alt       a short description of the photo
    excerpt   one or two sentences shown on the journal page
    body      the article, as a list of blocks:
                { p: "A paragraph." }
                { h: "A sub-heading" }
                { quote: "A highlighted sentence." }
                { list: ["First item", "Second item"] }

  Text is plain text, not HTML. Keep the quotes around each text and a comma after each block.
*/
export type PostBlock = { p: string } | { h: string } | { quote: string } | { list: string[] };

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  alt: string;
  excerpt: string;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: 'le-rif-a-moto',
    title: 'Le Rif à moto : nos routes préférées',
    date: '2025-05-02',
    category: 'Moto',
    image: 'https://images.unsplash.com/photo-1692419427640-92577f86e3e3?auto=format&fit=crop&w=1600&q=75',
    alt: 'Une chaîne de montagnes au-dessus d\'un village',
    excerpt: 'Virages, cols et villages perchés : quelques itinéraires que nous conseillons aux motards qui séjournent chez nous.',
    body: [
      { p: 'Beaucoup de nos hôtes arrivent à moto, et nous les comprenons : autour de Chefchaouen, les montagnes du Rif offrent des routes sinueuses, peu fréquentées et des panoramas à couper le souffle.' },
      { h: 'Vers Tétouan et la Méditerranée' },
      { p: 'La route vers le nord descend en lacets à travers les collines jusqu\'à Tétouan, puis rejoint la côte. Une belle journée de roulage, avec un déjeuner de poisson au bord de l\'eau.' },
      { h: 'Vers Akchour' },
      { p: 'Plus courte, la route d\'Akchour suit la rivière entre les falaises. Garez la moto au départ du sentier et finissez à pied jusqu\'aux cascades.' },
      { quote: 'Le soir, votre moto dort à l\'abri dans notre garage fermé ; vous, sur la terrasse.' },
      { h: 'Nos conseils' },
      { list: ['Partez tôt le matin pour profiter de la fraîcheur et d\'une lumière douce.', 'Faites le plein avant de quitter la ville : les stations se font rares en montagne.', 'Demandez-nous l\'état des routes : nous nous renseignons chaque semaine.'] },
    ],
  },
  {
    slug: 'meilleure-periode-chefchaouen',
    title: 'La meilleure période pour visiter Chefchaouen',
    date: '2025-04-20',
    category: 'Conseils',
    image: 'https://images.unsplash.com/photo-1770373815846-c4758cfe5e98?auto=format&fit=crop&w=1600&q=75',
    alt: 'Une ruelle bleue avec des escaliers',
    excerpt: 'Printemps fleuri, été en altitude ou automne doré : chaque saison a son charme dans la ville bleue.',
    body: [
      { p: 'On nous demande souvent quand venir. La réponse dépend de ce que vous cherchez, mais nous avons nos préférences.' },
      { h: 'Le printemps, notre saison favorite' },
      { p: 'De mars à mai, les montagnes sont vertes, les orangers fleurissent et les températures sont idéales pour marcher dans la médina comme sur les sentiers.' },
      { h: 'L\'été, plus frais qu\'ailleurs' },
      { p: 'Grâce à l\'altitude, Chefchaouen reste plus agréable que les villes de la plaine. Les journées sont chaudes, les soirées douces sur la terrasse.' },
      { h: 'L\'automne et l\'hiver' },
      { p: 'L\'automne apporte une belle lumière et moins de visiteurs. L\'hiver peut être froid et pluvieux : la maison se fait alors cocon, avec thé à la menthe et couvertures épaisses.' },
    ],
  },
  {
    slug: 'cuisine-marocaine-saveurs-traditions',
    title: 'Cuisine marocaine : saveurs et traditions',
    date: '2025-04-12',
    category: 'Cuisine',
    image: 'https://images.unsplash.com/photo-1643019237176-8ae0859f1123?auto=format&fit=crop&w=1600&q=75',
    alt: 'Un plat marocain sur une table aux carreaux colorés',
    excerpt: 'Tajine, bissara, fromage de chèvre des montagnes : ce que l\'on mange à notre table, et pourquoi.',
    body: [
      { p: 'À la Maison d\'hôtes Afassi, la cuisine se fait chaque jour, avec les produits du marché. Voici quelques plats que vous goûterez peut-être chez nous.' },
      { h: 'Le tajine' },
      { p: 'Mijoté lentement dans son plat de terre, il change selon la saison : agneau aux pruneaux, poulet au citron confit, légumes du jardin.' },
      { h: 'La bissara du matin' },
      { p: 'Cette soupe de fèves, typique du nord, réchauffe les matins frais. Un filet d\'huile d\'olive, un peu de cumin, et la journée peut commencer.' },
      { quote: 'Le thé à la menthe se sert de haut, pour faire mousser : c\'est un geste d\'accueil.' },
      { h: 'Le fromage de chèvre' },
      { p: 'Les montagnes autour de Chefchaouen sont réputées pour leur fromage frais de chèvre. Nous le servons au petit-déjeuner, avec du miel et du pain chaud.' },
    ],
  },
  {
    slug: 'tresors-caches-chefchaouen',
    title: 'Trésors cachés autour de Chefchaouen',
    date: '2025-04-05',
    category: 'Balades',
    image: 'https://images.unsplash.com/photo-1719772677131-a04070b6c755?auto=format&fit=crop&w=1600&q=75',
    alt: 'Vue sur Chefchaouen depuis les collines',
    excerpt: 'Au-delà des ruelles bleues : les coins que nous montrons à nos amis quand ils viennent nous voir.',
    body: [
      { p: 'La médina mérite des heures de flânerie, mais la région cache bien d\'autres merveilles. Voici nos adresses de cœur.' },
      { h: 'La mosquée espagnole' },
      { p: 'Une courte montée depuis la porte de la médina mène à cette mosquée sur la colline. Allez-y au coucher du soleil : toute la ville bleue s\'illumine à vos pieds.' },
      { h: 'Ras el Maa' },
      { p: 'Au pied de la médina, la source où les habitants viennent chercher la fraîcheur. Un lieu simple et vivant, parfait pour une pause.' },
      { h: 'Les cascades d\'Akchour' },
      { p: 'À une heure de route, un sentier le long de la rivière mène à des cascades et à un pont naturel de roche. Prévoyez de bonnes chaussures et une journée entière.' },
    ],
  },
];
