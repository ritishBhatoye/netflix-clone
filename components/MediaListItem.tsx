import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";

type MediaListItemProps = {
  mediaItem: MediaListData;
};

const MediaListItem = ({ mediaItem }: MediaListItemProps) => {
  return (
    <Link href={`mediaDetail/${mediaItem.id}`} asChild>
      <Image
        contentFit="contain"
        source={{ uri: mediaItem.image }}
        style={{ width: 110, height: 160, borderRadius: 8 }}
      />
    </Link>
  );
};

export default MediaListItem;
