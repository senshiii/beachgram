import { FavoriteBorderOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import CardThumb from "../assets/auth-page-bg.jpg";
import { likeEvent, rsvpEvent, unlikeEvent, unRvspEvent } from "../api/user";

const EventCard = ({
  rsvped,
  liked,
  event,
  showBeachInfo,
  onRsvp,
  onUnRsvp,
  onLikeEvent,
  onUnlikeEvent,
}) => {
  const nav = useNavigate();
  const {
    uid,
    addEventRsvp,
    removeEventRsvp,
    addEventLike,
    removeEventLike,
  } = useContext(UserContext);

  const handleRsvp = useCallback(async () => {
    await rsvpEvent(event.id, uid);
    addEventRsvp(event.id);
    if (onRsvp && typeof onRsvp === "function") onRsvp(event.id);
  }, [event.id, uid]);

  const handleUnRsvp = useCallback(async () => {
    await unRvspEvent(event.id, uid);
    removeEventRsvp(event.id);
    if (onUnRsvp && typeof onUnRsvp === "function") onUnRsvp(event.id);
  }, [event.id, uid]);

  const handleLike = useCallback(async () => {
    console.log('Liking event', event.id);
    await likeEvent(event.id, uid);
    addEventLike(event.id);
    if (onLikeEvent && typeof onLikeEvent === "function") onLikeEvent(event.id);
  }, [event.id]);

  const handleUnLike = useCallback(async () => {
    await unlikeEvent(event.id, uid);
    removeEventLike(event.id);
    if (onUnlikeEvent && typeof onUnlikeEvent === "function")
      onUnlikeEvent(event.id);
  }, [event.id]);

  return (
    <>
      <Box
        bgcolor="#302e2e"
        my={3}
        sx={{ borderRadius: "8px" }}
        p={3}
        width="100%"
        boxShadow="0 0 10px -4px #000"
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
          {rsvped && (
            <Chip
              label="Rsvp-ed"
              sx={{
                my: 2,
                background: "lightgreen",
                color: "black",
                fontWeight: "bold",
              }}
            />
          )}
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
            <IconButton
              onClick={liked ? handleUnLike : handleLike}
              bgcolor="white"
              sx={{ mr: 3 }}
            >
              <FavoriteBorderOutlined htmlColor={liked ? "red" : "white"} />
            </IconButton>
            {rsvped ? (
              <Button
                onClick={handleUnRsvp}
                fullWidth
                sx={{ background: "red", color: "white" }}
              >
                {event.paidRsvp ? "Cancel Tickets" : "I'm Out"}
              </Button>
            ) : (
              <Button
                fullWidth
                my={2}
                sx={{
                  background: "linear-gradient(45deg, purple, orange)",
                  color: "white",
                  fontSize: ".8rem",
                }}
                onClick={handleRsvp}
              >
                {event.paidRsvp
                  ? `Book Tickets at ${event.ticketCost}`
                  : "Click to Rsvp"}
              </Button>
            )}
          </Box>
        </Box>
        {showBeachInfo && (
          <Box
            onClick={() => nav(`/beach/${event.beachId}`)}
            sx={{
              bgcolor: "#1f1d1d",
              my: 2,
              p: 2,
              display: "flex",
              borderRadius: 2,
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={CardThumb}
              style={{ borderRadius: 6 }}
              width="64px"
              height="64px"
            />
            <Box sx={{ flex: 1, ml: 2 }}>
              <Typography color="white" variant="h6">
                {event.beachDetails.name}
              </Typography>
              <Typography color="white" variant="caption">
                {event.beachDetails.address}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default EventCard;
