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
