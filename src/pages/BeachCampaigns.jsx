import { Box, CircularProgress, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BottomNav from "../components/BottomNav";
import { useContext, useEffect, useState } from "react";
import { BeachContext } from "../context/BeachContext";
import { getCampaignsByBeachId } from "../api/campaigns";
import CampaignCard from "../components/CampaignCard";

const BeachCampaigns = () => {
  const { uid } = useContext(BeachContext);

  const [isLoading, setIsLoading] = useState(false);
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    getCampaignsByBeachId(uid).then((fetchedCamps) => {
      setIsLoading(false);
      setCamps(fetchedCamps);
    });
  }, [uid]);
  return (
    <>
      <Box minHeight="100vh" p={2} bgcolor="#29292b" paddingBottom="10vh">
        <Typography variant="h6" color="white">
          Your Campaigns
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
          camps.map((camp) => (
            <CampaignCard
              showAdminControls
              hideUserActions
              campaign={camp}
              key={camp.id}
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
        activeTabId={1}
      />
    </>
  );
};

export default BeachCampaigns;
