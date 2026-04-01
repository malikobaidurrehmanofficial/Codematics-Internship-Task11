const mockMovies = [
  {
    id: 1,
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    poster: 'https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    rating: 8.8,
    year: 2010,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    language: 'English',
    runtime: '148 min',
  },
  {
    id: 2,
    title: 'The Dark Knight',
    overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911TWUjHPilu7kg.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5ez.jpg',
    rating: 9.0,
    year: 2008,
    genres: ['Action', 'Crime', 'Drama'],
    language: 'English',
    runtime: '152 min',
  },
  {
    id: 3,
    title: 'Interstellar',
    overview: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK1DVfjko.jpg',
    rating: 8.7,
    year: 2014,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    language: 'English',
    runtime: '169 min',
  },
  {
    id: 4,
    title: 'Parasite',
    overview: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/TU9aI8gJEiU0cMpjMfsxEEsN5sX.jpg',
    rating: 8.5,
    year: 2019,
    genres: ['Comedy', 'Drama', 'Thriller'],
    language: 'Korean',
    runtime: '132 min',
  },
  {
    id: 5,
    title: 'The Shawshank Redemption',
    overview: 'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
    poster: 'https://image.tmdb.org/t/p/w500/9cjIGRQL0MASQEqnVT2ORZFJS3y.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg',
    rating: 9.3,
    year: 1994,
    genres: ['Drama'],
    language: 'English',
    runtime: '142 min',
  },
  {
    id: 6,
    title: 'Pulp Fiction',
    overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    rating: 8.9,
    year: 1994,
    genres: ['Crime', 'Drama'],
    language: 'English',
    runtime: '154 min',
  },
  {
    id: 7,
    title: 'Spirited Away',
    overview: 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
    poster: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg',
    rating: 8.6,
    year: 2001,
    genres: ['Animation', 'Adventure', 'Fantasy'],
    language: 'Japanese',
    runtime: '125 min',
  },
  {
    id: 8,
    title: 'The Matrix',
    overview: 'When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.',
    poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg',
    rating: 8.7,
    year: 1999,
    genres: ['Action', 'Sci-Fi'],
    language: 'English',
    runtime: '136 min',
  },
  {
    id: 9,
    title: 'Whiplash',
    overview: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.',
    poster: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/6bbZ6XlDq4oCTvUwQ5cLBkHnSBt.jpg',
    rating: 8.5,
    year: 2014,
    genres: ['Drama', 'Music'],
    language: 'English',
    runtime: '106 min',
  },
  {
    id: 10,
    title: 'Fight Club',
    overview: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
    poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QI4S2t0POPt.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/hZkgoQYus5dXo3H8T7Uef6DNknx.jpg',
    rating: 8.8,
    year: 1999,
    genres: ['Drama', 'Thriller'],
    language: 'English',
    runtime: '139 min',
  },
  {
    id: 11,
    title: 'Dune: Part Two',
    overview: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg',
    rating: 8.6,
    year: 2024,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    language: 'English',
    runtime: '166 min',
  },
  {
    id: 12,
    title: 'Oppenheimer',
    overview: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    poster: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg',
    rating: 8.4,
    year: 2023,
    genres: ['Biography', 'Drama', 'History'],
    language: 'English',
    runtime: '180 min',
  },
  {
    id: 13,
    title: 'Everything Everywhere All at Once',
    overview: 'A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.',
    poster: 'https://image.tmdb.org/t/p/w500/w3LxiVFoEd9YkRqPie1KJCTYqxj.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg',
    rating: 8.0,
    year: 2022,
    genres: ['Action', 'Adventure', 'Comedy'],
    language: 'English',
    runtime: '139 min',
  },
  {
    id: 14,
    title: 'The Grand Budapest Hotel',
    overview: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel\'s glory years under an exceptional concierge.',
    poster: 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/nX5XotM9yprCKarRH4fzOq1VM1J.jpg',
    rating: 8.1,
    year: 2014,
    genres: ['Adventure', 'Comedy', 'Crime'],
    language: 'English',
    runtime: '99 min',
  },
  {
    id: 15,
    title: 'Spider-Man: Across the Spider-Verse',
    overview: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
    poster: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    rating: 8.7,
    year: 2023,
    genres: ['Animation', 'Action', 'Adventure'],
    language: 'English',
    runtime: '140 min',
  },
  {
    id: 16,
    title: 'The Godfather',
    overview: 'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
    poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg',
    rating: 9.2,
    year: 1972,
    genres: ['Crime', 'Drama'],
    language: 'English',
    runtime: '175 min',
  },
  {
    id: 17,
    title: 'Your Name',
    overview: 'Two teenagers share a profound, magical connection upon discovering they are swapping bodies. Things manage to become even more complicated when the boy and girl decide to meet in person.',
    poster: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/dIWwZW7dJJtqC6CgWzYkNVKIUm2.jpg',
    rating: 8.4,
    year: 2016,
    genres: ['Animation', 'Drama', 'Fantasy'],
    language: 'Japanese',
    runtime: '106 min',
  },
  {
    id: 18,
    title: 'Mad Max: Fury Road',
    overview: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
    poster: 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFBO.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/nlCHUWjY9XWbuEUQauCBgnY8wdB.jpg',
    rating: 8.1,
    year: 2015,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    language: 'English',
    runtime: '120 min',
  },
  {
    id: 19,
    title: 'La La Land',
    overview: 'While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.',
    poster: 'https://image.tmdb.org/t/p/w500/uDO8zWDhfWooFLyKYB47wJsMquB.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/nadTlnTE6DzKAMGJJ6JnNe6lj2F.jpg',
    rating: 8.0,
    year: 2016,
    genres: ['Comedy', 'Drama', 'Music'],
    language: 'English',
    runtime: '128 min',
  },
  {
    id: 20,
    title: 'Blade Runner 2049',
    overview: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    poster: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    backdrop: 'https://image.tmdb.org/t/p/original/sAtoMqDVhNDQBc3QJL3RF6hlhGq.jpg',
    rating: 8.0,
    year: 2017,
    genres: ['Action', 'Drama', 'Sci-Fi'],
    language: 'English',
    runtime: '164 min',
  },
];

export const GENRES = [
  'Action', 'Adventure', 'Animation', 'Biography', 'Comedy',
  'Crime', 'Drama', 'Fantasy', 'History', 'Music',
  'Sci-Fi', 'Thriller',
];

export const LANGUAGES = ['English', 'Japanese', 'Korean'];
export const YEARS = [2024, 2023, 2022, 2019, 2017, 2016, 2015, 2014, 2010, 2008, 2001, 1999, 1994, 1972];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getTrending = async () => {
  await delay(600);
  const trendingIds = [11, 12, 13, 15, 1, 3, 8];
  return mockMovies.filter((m) => trendingIds.includes(m.id));
};

export const getTopRated = async () => {
  await delay(600);
  return [...mockMovies].sort((a, b) => b.rating - a.rating).slice(0, 8);
};

export const getPopular = async () => {
  await delay(600);
  return mockMovies.slice(5, 15);
};

export const getMovieById = async (id) => {
  await delay(400);
  const movie = mockMovies.find((m) => m.id === Number(id));
  if (!movie) throw new Error('Movie not found');
  return movie;
};

export const searchMovies = async ({ query = '', genre = '', year = '', rating = '', language = '', sort = 'latest', page = 1 }) => {
  await delay(500);
  let results = [...mockMovies];

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (m) => m.title.toLowerCase().includes(q) || m.overview.toLowerCase().includes(q)
    );
  }
  if (genre) {
    results = results.filter((m) => m.genres.includes(genre));
  }
  if (year) {
    results = results.filter((m) => m.year === Number(year));
  }
  if (rating) {
    results = results.filter((m) => m.rating >= Number(rating));
  }
  if (language) {
    results = results.filter((m) => m.language === language);
  }

  if (sort === 'top_rated') {
    results.sort((a, b) => b.rating - a.rating);
  } else {
    results.sort((a, b) => b.year - a.year);
  }

  const pageSize = 8;
  const start = (page - 1) * pageSize;
  const paginated = results.slice(start, start + pageSize);

  return {
    results: paginated,
    totalResults: results.length,
    totalPages: Math.ceil(results.length / pageSize),
    page,
  };
};

export const getHeroMovies = async () => {
  await delay(300);
  return mockMovies.filter((m) => [2, 3, 11, 15].includes(m.id));
};

export default mockMovies;
