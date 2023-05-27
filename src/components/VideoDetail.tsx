import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from "./compIndex";
import { fetchFromAPI } from "../fetchFromAPI";
import { useQuery } from "@tanstack/react-query";

function VideoDetail() {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState<any>(null);
  const [videos, setVideos] = useState<any>(null);

  useQuery({
    queryKey: ["videos", "statistics", id],
    queryFn: () =>
      fetchFromAPI(`videos?.part=snippet,statistics&id=${id}`).then(
        (data) => data.items[0]
      ),
    onSuccess(data) {
      setVideoDetail(data);
    },
  });

  useQuery({
    queryKey: ["videos", "relatedSuggestion", id],
    queryFn: () =>
      fetchFromAPI(
        `search?part=snippet&relatedToVideoId=${id}&type=video`
      ).then((data) => data.items),
    onSuccess(data) {
      setVideos(data);
    },
  });

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "77px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {videoDetail?.snippet?.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${videoDetail?.snippet?.channelId}`}>
                <Typography variant={"h6"} color="#fff">
                  {videoDetail?.snippet?.channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  ></CheckCircle>
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(
                    videoDetail?.statistics?.viewCount,
                    10
                  ).toLocaleString()}{" "}
                  views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(
                    videoDetail?.statistics?.likeCount,
                    10
                  ).toLocaleString()}{" "}
                  likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          {videos && <Videos videos={videos} direction="column" />}
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail;
