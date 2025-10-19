import { ScrollView } from 'react-native';

import HeroBanner from '@/components/home/HeroBanner';
import HomeScreenSkeleton from '@/components/home/HomeScreenSkeleton';
import MediaRow from '@/components/home/MediaRow';
import { useHomeContent } from '@/hooks/useHomeContent';
import { getRandomGradient } from '@/utils/gradientColors';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const { featured, top10, onlyOnNetflix, popular, genres, isLoading } = useHomeContent();
  const [gradientColors, setGradientColors] = useState(getRandomGradient());
  // Change gradient when movie changes or every hour
  useEffect(() => {
    setGradientColors(getRandomGradient());

    // Change gradient every hour (3600000 ms)
    const interval = setInterval(() => {
      setGradientColors(getRandomGradient());
    }, 3600000);

    return () => clearInterval(interval);
  }, [featured?.data?.[0]]);

  if (isLoading) return <HomeScreenSkeleton />;

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 1.2 }}
      end={{ x: 0, y: 1 }}
      locations={[0, 0.3, 0.6, 1]}
    >
      <ScrollView>

        <HeroBanner movie={featured.data?.[0]} />
        <MediaRow title="Top 10 Today" data={top10.movies} />
        <MediaRow title="Only on Netflix" data={onlyOnNetflix.movies} />
        <MediaRow title="Popular" data={popular.data} />
        <MediaRow title="Action" data={genres.action} />
        <MediaRow title="Comedy" data={genres.comedy} />
      </ScrollView>
    </LinearGradient>
  );
}
