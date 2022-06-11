import { Box, Fab, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import BottomNav from "../components/BottomNav/BottomNav";
import AddIcon from "@mui/icons-material/Add";
import { BeachContext } from "../context/BeachContext";
import { getEventsByBeachId } from "../api/events";

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
      <Box minHeight="100vh" p={2} bgcolor="#29292b">
        <Typography color="white" variant="h5">
          My Events
        </Typography>
        {events.map((ev) => (
          <p>{ev.id}</p>
        ))}
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
        jobHref="/beach/work"
        profileHref="/beach/profile"
        activeTabId={0}
      />
    </>
  );
};

export default BeachEvents;
