import { useQuery } from '@tanstack/react-query';

const mapRuntime = (runtime) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  if (hours === 0) {
    return `${minutes} min`;
  }
  if (minutes === 0) {
    return `${hours} h`;
  }
  return `${hours} h ${minutes} min`;
};

export const mapMovie = (movie) => {
  return {
    image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}.jpg`,
    secondaryImage: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}.jpg`,
    title: movie.original_title,
    id: movie.id || '',
    releaseDate: movie.release_date,
    ...movie,
    runtime: mapRuntime(movie.runtime),
  };
};

const searchMovies = async (query) => {
  const result = await fetchMovies(`search?query=${query}`);
  if (result && result.length > 0) {
    const all = result.map(mapMovie).filter((movie) => movie.image);
    return all;
  } else {
    return [];
  }
};

const searchMovie = async (query) => {
  const result = await fetchMovies(`movie?id=${query}`);
  if (result) {
    return mapMovie(result);
  } else {
    return [];
  }
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

const useSearchMovie = (id) => {
  return useQuery({
    queryKey: ['searchMovies', id],
    queryFn: () => searchMovie(id),
    enabled: !!id,
  });
};

const useSearchMovies = (debouncedQuery) => {
  return useQuery({
    queryKey: ['searchMovies', debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: !!debouncedQuery,
  });
};

export { useFetchMovies, useSearchMovies, useSearchMovie };
