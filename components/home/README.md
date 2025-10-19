# Home Components Usage

## MediaRow Component

A reusable horizontal scrolling row for displaying movies/TV shows.

```tsx
import MediaRow from '../components/home/MediaRow';
import { useGetTrendingMoviesQuery } from '../services/moviesApi';

function MyScreen() {
  const { data, isLoading } = useGetTrendingMoviesQuery();
  
  return (
    <MediaRow 
      title="Trending Now" 
      data={data} 
      isLoading={isLoading} 
    />
  );
}
```

### Props
- `title` (string) - Row title
- `data` (FeaturedMovieProps[] | TVShowProps[]) - Array of movies or TV shows
- `isLoading` (boolean) - Shows skeleton loading state

## Top10MediaRow Component

Special row with large rank numbers (1-10) for Top 10 content.

```tsx
import Top10MediaRow from '../components/home/Top10MediaRow';
import { useGetTop10MoviesQuery } from '../services/moviesApi';

function MyScreen() {
  const { data, isLoading } = useGetTop10MoviesQuery();
  
  return (
    <Top10MediaRow 
      title="Top 10 Movies Today" 
      data={data} 
      isLoading={isLoading} 
    />
  );
}
```

### Props
- Same as MediaRow
- Automatically limits to first 10 items
- Displays large rank numbers (1-10)

## HomeContent Component

Complete home screen with all content sections pre-configured.

```tsx
import HomeContent from '../components/home/HomeContent';

export default function HomeScreen() {
  return <HomeContent />;
}
```

### Features
- Fetches all home content automatically
- Includes loading and error states
- Pre-configured sections:
  - Featured/Hero banner
  - Top 10 Movies Today
  - Only on Netflix
  - Trending Now
  - Popular on Netflix
  - Now Playing
  - Action Movies
  - Comedy
  - Horror
  - Romance
  - Documentaries

## Custom Implementation

If you want more control, use individual components:

```tsx
import { ScrollView } from 'react-native';
import { useHomeContent } from '../hooks/useHomeContent';
import FeaturedMovie from '../components/home/FeaturedMovie';
import MediaRow from '../components/home/MediaRow';
import Top10MediaRow from '../components/home/Top10MediaRow';

export default function CustomHomeScreen() {
  const { featured, top10, popular } = useHomeContent();

  return (
    <ScrollView className="bg-black">
      {/* Hero */}
      {featured.data?.[0] && <FeaturedMovie movie={featured.data[0]} />}
      
      {/* Your custom sections */}
      <Top10MediaRow title="Top 10" data={top10.movies} />
      <MediaRow title="Popular" data={popular.data} />
    </ScrollView>
  );
}
```

## Styling

Components use Tailwind CSS (NativeWind) classes. Customize by:

1. Modifying className props
2. Adjusting the style objects
3. Creating variant props for different layouts

## Image Handling

- Uses TMDB image base URL: `https://image.tmdb.org/t/p/w500`
- Fallback UI for missing images
- Optimized with expo-image for performance
