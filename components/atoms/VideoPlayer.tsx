import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View } from 'react-native';
import Button from './Button';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  videoSource: string;
}

const VideoPlayer = ({ videoSource }: Props) => {
  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <View className="flex-1 items-center justify-center">
      <VideoView className="w-full h-full" player={player} allowsFullscreen allowsPictureInPicture />
      <View className="absolute bottom-10">
        <Button
          variant="primary"
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        >
          <Ionicons name={isPlaying ? 'pause' : 'play'} color="white" size={20} />
        </Button>
      </View>
    </View>
  );
};

export default VideoPlayer;
