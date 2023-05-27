import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./compIndex";
import { fetchFromAPI } from "../fetchFromAPI";
import { useQuery } from "@tanstack/react-query";

function ChannelDetail() {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  useQuery({
    queryKey: ["channels", id],
    queryFn: () =>
      fetchFromAPI(`channels?part=snippet&id=${id}`).then(
        (data) => data?.items[0]
      ),
    onSuccess(data) {
      setChannelDetail(data);
    },
  });

  useQuery({
    queryKey: ["videos", "channelVideos", id],
    queryFn: () =>
      fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
        (data) => data?.items
      ),
    onSuccess(data) {
      setVideos(data);
    },
  });

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(233,233,237,1) 0%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-110px" />
      </Box>
      <Box display="flex" p="2" sx={{ border: "1px solid red" }}>
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
}

export default ChannelDetail;
