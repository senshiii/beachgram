import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchAllEvents } from "../api/events";
import BottomNav from "../components/BottomNav";
import EventCard from "../components/EventCard";

const Feed = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAllEvents().then((events) => {
      setEvents(events);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Box bgcolor="#29292b" p={2} minHeight="100vh" paddingBottom="10vh" >
        <Typography variant="h5" color="white">
          Upcoming Events
        </Typography>
        {isLoading ? (
          <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
        ) : (
          <Box my={3}>
            {events.map((ev) => (
              <EventCard showBeachInfo key={ev.id} event={ev} />
            ))}
          </Box>
        )}
      </Box>
      <BottomNav
        eventsHref="/feed"
        campHref="/campaigns"
        profileHref="/profile"
        activeTabId={0}
      />
    </>
  );
};

export default Feed;
