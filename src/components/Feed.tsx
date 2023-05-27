import { Box, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Sidebar, Videos } from "./compIndex";
import { fetchFromAPI } from "../fetchFromAPI";
import { useQuery } from "@tanstack/react-query";

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState<string>(`New`);
  const [videos, setVideos] = useState<any>([]);

  useQuery({
    queryKey: ["videos", selectedCategory],
    queryFn: () =>
      fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then(
        (data) => data.items
      ),
    enabled: Boolean(selectedCategory),
    onSuccess: (data) => {
      setVideos(data);
    },
  });

  // setVideos(categoryVideos);

  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box
        sx={{
          height: { xs: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { xs: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2023 MeTube
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>videos</span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
}

export default Feed;
