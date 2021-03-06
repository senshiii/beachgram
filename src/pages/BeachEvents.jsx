import { Box, CircularProgress, Fab, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import AddIcon from "@mui/icons-material/Add";
import { BeachContext } from "../context/BeachContext";
import { getEventsByBeachId } from "../api/events";
import EventCard from "../components/EventCard";

const BeachEvents = () => {
  const { uid } = useContext(BeachContext);

  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEventsByBeachId(uid).then((fetchedEvents) => {
      setIsLoading(false);
      setEvents(fetchedEvents);
    });
  }, [uid]);

  return (
    <>
      <Box minHeight="100vh" p={2} bgcolor="#29292b" paddingBottom="10vh">
        <Typography color="white" variant="h5">
          Your Events
        </Typography>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress />
            <Typography variant="body1" mt={2}>
              Loading Campigns...
            </Typography>
          </Box>
        ) : (
          events.map((ev) => (
            <EventCard
              key={ev.id}
              showAdminControls
              hideUserActions
              event={ev}
            />
          ))
        )}
      </Box>
      <Fab
        size="small"
        sx={{
          position: "fixed",
          right: "10px",
          bottom: "10vh",
        }}
        color="primary"
        aria-label="Add"
      >
        <AddIcon />
      </Fab>
      <BottomNav
        eventsHref="/beach/events"
        campHref="/beach/campaigns"
        profileHref="/beach/profile"
        activeTabId={0}
      />
    </>
  );
};

export default BeachEvents;
