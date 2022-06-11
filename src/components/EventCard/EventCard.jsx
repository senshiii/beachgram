import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import React from "react";
import CardThumb from "../../assets/auth-page-bg.jpg";

const EventCard = ({ event }) => {
  return (
    <Box
      bgcolor="#302e2e"
      my={3}
      sx={{ borderRadius: "8px" }}
      p={3}
      width="100%"
    >
      <img
        src={CardThumb}
        style={{
          width: "100%",
          height: "100px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "6px",
        }}
      />
      <Box>
        <Typography
          variant="body1"
          my={1}
          sx={{
            background: "linear-gradient(to right, violet, orange)",
            backgroundClip: "text",
            textFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          {event.title}
        </Typography>
        <Typography variant="body2" color="gray">
          {new Date(event.eventDate.toDate()).toLocaleDateString("en-Us", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Typography>
        <Typography variant="body2" my={1} color="white">
          {event.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton bgcolor="white" sx={{mr: 3}} >
            <FavoriteBorderOutlined htmlColor="white" />
          </IconButton>
          <Button
            fullWidth
            my={2}
            sx={{
              background: "linear-gradient(45deg, purple, orange)",
              color: "white",
              fontSize: ".8rem",
            }}
          >
            {event.paidRsvp
              ? `Book Tickets at ${event.ticketCost}`
              : "Click to Rsvp"}
          </Button>
        </Box>
      </Box>
      <Box sx={{
        bgcolor: 'black',
        my: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }} >
        <img src={CardThumb} width="64px" height="64px" />
        <Box>
          <Typography variant="body2" >{}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EventCard;
