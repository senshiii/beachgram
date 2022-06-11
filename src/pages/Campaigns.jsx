import { Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCampaigns } from "../api/campaigns";
import BottomNav from "../components/BottomNav";
import CampaignCard from "../components/CampaignCard";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCampaigns().then((camps) => {
      setCampaigns(camps);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Box bgcolor="#29292b" p={2} minHeight="100vh" paddingBottom="10vh">
        <Typography variant="h5" color="white">
          Upcoming Campaigns
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
          campaigns.map((camp) => (
            <CampaignCard showBeachInfo campaign={camp} key={camp.id} />
          ))
        )}
      </Box>
      <BottomNav
        eventsHref="/feed"
        campHref="/campaigns"
        profileHref="/profile"
        activeTabId={1}
      />
    </>
  );
};

export default Campaigns;
