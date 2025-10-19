type MediaType = "TV_SERIES" | "MOVIE";

type MediaListData = {
  id: string;
  image: string;
  type: string;
};

type MediaList = {
  id: string;
  title: string;
  data: MediaListData[];
};

type Episode = {
  id: string;
  episodeTitle: string;
  episodeDescription: string;
  episodeNumber: number;
  duration: number;
  episodeThumbnail: string;
  videoUrl: string;
};

type Season = {
  seasonName: string;
  episodes: Episode[];
};

type Media = {
  id: string;
  type: MediaType;
  title: string;
  description: string;
  releaseYear: number;
  ageRestriction: string;
  thumbnail: string;
  trailer: string;
  seasons: Season[];
};

type FilterType = {
  id: number;
  title: string;
};

type MediaDetailType = {
  title: string;
  thumbnail: string;
  releaseYear: number;
  ageRestriction: string;
  duration: string;
  description: string;
  type: string;
};
//API integration
interface FeaturedMovieProps {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  media_type: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

interface TVShowProps {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
}

interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface Genre {
  id: number;
  name: string;
}
