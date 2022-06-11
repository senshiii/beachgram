import {
  AllOutSharp,
  Celebration,
  FastfoodSharp,
  SurfingSharp,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const ThingToDoCard = ({ ttd }) => {
  let Icon = null;

  switch (ttd.id) {
    case "surfing":
      Icon = <SurfingSharp sx={{ fontSize: '2rem' }} htmlColor="lightblue" />;
      break;
    case "picnic":
      Icon = <AllOutSharp sx={{ fontSize: '2rem' }} htmlColor="green" />;
      break;
    case "restaurant":
      Icon = <FastfoodSharp sx={{ fontSize: '2rem' }} htmlColor="orange" />;
      break;
    default:
      Icon = <Celebration sx={{ fontSize: '2rem' }} htmlColor="purple" />;
      break;
  }

  return (
    <Box
      bgcolor="#1f2021"
      color="white"
      my={2}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box>{Icon}</Box>
      <Box sx={{ flex: 1, ml: 3 }} >
        <Typography variant="h6">{ttd.title}</Typography>
        <Typography variant="body2" color="gray" >{ttd.description}</Typography>
      </Box>
    </Box>
  );
};

export default ThingToDoCard;
