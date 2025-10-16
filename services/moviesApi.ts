import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<FeaturedMovieProps[], void>({
      query: () => `/trending/movie/day?api_key=${API_KEY}`,
      transformResponse: (response: any) => response.results,
    }),
  }),
});

export const { useGetTrendingMoviesQuery } = moviesApi;
