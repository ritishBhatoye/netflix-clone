import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

type MediaListItemProps = {
  mediaItem: MediaListData;
};

const MediaListItem = ({ mediaItem }: MediaListItemProps) => {
  return (
    <Link href={`mediaDetail/${mediaItem.id}`} asChild>
      <TouchableOpacity>
        <Image
          contentFit="cover"
          source={{ uri: mediaItem.image }}
          style={{ width: 110, height: 140, borderRadius: 5 }}
        />
      </TouchableOpacity>
    </Link>
  );
};

export default MediaListItem;
