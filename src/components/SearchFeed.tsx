import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Videos } from "./compIndex";
import { fetchFromAPI } from "../fetchFromAPI";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function SearchFeed() {
  const [videos, setVideos] = useState<any>([]);
  const { searchTerm } = useParams();

  useQuery({
    queryKey: ["videos", searchTerm],
    queryFn: () =>
      fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then(
        (data) => data.items
      ),
    onSuccess: (data) => {
      setVideos(data);
    },
  });

  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search Results for :
        <span style={{ color: "#F31503" }}> {searchTerm}</span> videos
      </Typography>

      <Videos videos={videos} />
    </Box>
  );
}

export default SearchFeed;
