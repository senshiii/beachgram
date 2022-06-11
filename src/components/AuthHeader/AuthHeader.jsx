import { Box, Typography } from "@mui/material";
import React from "react";

const AuthHeader = () => {
  return (
    <Box
      bgcolor="white"
      width="100%"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
      height="10vh"
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
        }}
        className="font-lobster"
      >
        Beachgram
      </Typography>
    </Box>
  );
};

export default AuthHeader;
