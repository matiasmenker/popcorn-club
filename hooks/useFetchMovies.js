import { useQuery } from '@tanstack/react-query';

export const mapMovie = (movie) => {
  return {
    image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}.jpg`,
    secondaryImage: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}.jpg`,
    title: movie.original_title,
    id: movie.id || '',
    releaseDate: movie.release_date,
    ...movie,
  };
};

const fetchMovies = async (url) => {
  const response = await fetch(
    `https://popcorn-club-api.vercel.app/api/${url}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return await response.json();
};

const useFetchMovies = (url) => {
  return useQuery({
    queryKey: ['movies', url],
    queryFn: async () => {
      const result = await fetchMovies(url);
      if (result && result.length > 0) {
        return result.map(mapMovie);
      }
      throw new Error('No movies found');
    },
  });
};

export { useFetchMovies, fetchMovies };
