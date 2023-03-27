import { Stack, Box } from "@mui/material";
import { ChannelCard, VideoCard } from "./compIndex";

interface VideoProps {
  videos: any;
  direction?: string;
}

function Videos({ videos, direction }: VideoProps) {
  const dir = direction === "column" ? direction : "row";
  return (
    <Stack
      direction={dir}
      flexWrap="wrap"
      justifyContent="space-evenly"
      gap={2}
    >
      {videos
        .filter((item: any) => item.id.videoId)
        .map((item: any, idx: number) => (
          <Box key={idx}>
            {item.id.videoId && <VideoCard video={item} />}
            {item.id.channelId && (
              <ChannelCard channelDetail={item} marginTop={""} />
            )}
          </Box>
        ))}
    </Stack>
  );
}

export default Videos;
