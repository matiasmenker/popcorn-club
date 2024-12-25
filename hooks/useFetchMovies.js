import {useQuery} from "@tanstack/react-query";

const mapMovie = (movie) => {
    return {
        image: `https://image.tmdb.org/t/p/original/${movie.poster_path}.jpg`,
        secondaryImage: `https://image.tmdb.org/t/p/original/${movie.backdrop_path}.jpg`,
        title: movie.original_title,
        id: movie.id || '',
        releaseDate: movie.release_date
    };
};

const fetchMovies = async (type) => {
    const response = await fetch(
        `https://popcorn-club-api.vercel.app/api/${type}`
    );
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return await response.json();
};

const useFetchMovies = (key) => {
    return useQuery({
        queryKey: ['movies', key],
        queryFn: async () => {
            const result = await fetchMovies(key);
            if (result && result.length > 0) {
                return result.map(mapMovie);
            }
            throw new Error('No movies found');
        },
    });
}

export {
    useFetchMovies
}
