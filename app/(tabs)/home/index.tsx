import { ScrollView, Text } from 'react-native';

import HeroBanner from '@/components/home/HeroBanner';
import MediaRow from '@/components/home/MediaRow';
import { useHomeContent } from '@/hooks/useHomeContent';

export default function HomeScreen() {
  const { featured, top10, onlyOnNetflix, popular, genres, isLoading } = useHomeContent();

  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <HeroBanner movie={featured.data?.[0]} />
      <MediaRow title="Top 10 Today" data={top10.movies} />
      <MediaRow title="Only on Netflix" data={onlyOnNetflix.movies} />
      <MediaRow title="Popular" data={popular.data} />
      <MediaRow title="Action" data={genres.action} />
      <MediaRow title="Comedy" data={genres.comedy} />
    </ScrollView>
  );
}
