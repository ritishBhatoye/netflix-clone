# Redux Hooks Usage Guide

## Available Hooks

### 1. Individual API Hooks (from `moviesApi`)

```tsx
import {
  useGetTrendingMoviesQuery,
  useGetTrendingTVShowsQuery,
  useGetTop10MoviesQuery,
  useGetTop10TVShowsQuery,
  useGetNetflixOriginalsQuery,
  useGetNetflixOriginalShowsQuery,
  useGetTopRatedMoviesQuery,
  useGetTopRatedTVShowsQuery,
  useGetUpcomingMoviesQuery,
  useGetNowPlayingMoviesQuery,
  useGetMoviesByGenreQuery,
  useGetTVShowsByGenreQuery,
} from '../services/moviesApi';

// Example: Fetch trending movies
const { data, isLoading, isError } = useGetTrendingMoviesQuery();

// Example: Fetch movies by genre
const { data: actionMovies } = useGetMoviesByGenreQuery(28); // 28 = Action
```

### 2. Combined Home Content Hook

```tsx
import { useHomeContent } from '../hooks/useHomeContent';

function HomeScreen() {
  const {
    featured,
    top10,
    onlyOnNetflix,
    popular,
    nowPlaying,
    genres,
    isLoading,
    isError,
  } = useHomeContent();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorMessage />;

  return (
    <ScrollView>
      {/* Hero Banner */}
      <HeroBanner movie={featured.data?.[0]} />
      
      {/* Top 10 Today */}
      <MediaRow title="Top 10 Today" data={top10.movies} />
      
      {/* Only on Netflix */}
      <MediaRow title="Only on Netflix" data={onlyOnNetflix.movies} />
      
      {/* Popular */}
      <MediaRow title="Popular on Netflix" data={popular.data} />
      
      {/* Now Playing */}
      <MediaRow title="Now Playing" data={nowPlaying.data} />
      
      {/* By Genre */}
      <MediaRow title="Action Movies" data={genres.action} />
      <MediaRow title="Comedy" data={genres.comedy} />
      <MediaRow title="Horror" data={genres.horror} />
      <MediaRow title="Romance" data={genres.romance} />
      <MediaRow title="Documentaries" data={genres.documentaries} />
    </ScrollView>
  );
}
```

### 3. Genre-Specific Hook

```tsx
import { useGenreContent } from '../hooks/useGenreContent';
import { MOVIE_GENRES } from '../constants/genres';

function ActionMoviesScreen() {
  const { movies, isLoading, isError } = useGenreContent(MOVIE_GENRES.ACTION);

  return (
    <View>
      {movies.data?.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </View>
  );
}

// With TV shows included
function SciFiContent() {
  const { movies, tvShows } = useGenreContent(MOVIE_GENRES.SCIENCE_FICTION, true);

  return (
    <View>
      <MediaRow title="Sci-Fi Movies" data={movies.data} />
      <MediaRow title="Sci-Fi TV Shows" data={tvShows?.data} />
    </View>
  );
}
```

## Available Genre Constants

```tsx
import { MOVIE_GENRES, TV_GENRES } from '../constants/genres';

// Movie Genres
MOVIE_GENRES.ACTION          // 28
MOVIE_GENRES.COMEDY          // 35
MOVIE_GENRES.HORROR          // 27
MOVIE_GENRES.ROMANCE         // 10749
MOVIE_GENRES.SCIENCE_FICTION // 878
MOVIE_GENRES.THRILLER        // 53
MOVIE_GENRES.DRAMA           // 18
// ... and more

// TV Genres
TV_GENRES.ACTION_ADVENTURE   // 10759
TV_GENRES.COMEDY             // 35
TV_GENRES.CRIME              // 80
// ... and more
```

## Home Tab Content Sections

For a Netflix-like home screen, you can organize content like this:

1. **Hero/Featured Banner** - `featured.data[0]` (First trending movie)
2. **Top 10 Today** - `top10.movies` or `top10.tvShows`
3. **Only on Netflix** - `onlyOnNetflix.movies` or `onlyOnNetflix.shows`
4. **Popular on Netflix** - `popular.data`
5. **Trending Now** - `featured.data`
6. **Now Playing** - `nowPlaying.data`
7. **Action Movies** - `genres.action`
8. **Comedy** - `genres.comedy`
9. **Horror** - `genres.horror`
10. **Romance** - `genres.romance`
11. **Documentaries** - `genres.documentaries`

## Tips

- All hooks return `{ data, isLoading, isError, error }` from RTK Query
- Data is automatically cached and refetched when needed
- Use `skip` option to conditionally fetch: `useGetMoviesByGenreQuery(id, { skip: !shouldFetch })`
- Combine multiple hooks for complex screens
- Use `useHomeContent` for the main home screen to fetch everything at once
