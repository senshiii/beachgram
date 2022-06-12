import { Person, PersonAddAlt } from "@mui/icons-material";
import { Box, Button, Chip, Typography } from "@mui/material";
import CardThumb from "../assets/auth-page-bg.jpg";
import { useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { rsvpCampaign, unRsvpCampaign } from "../api/user";

const CampaignCard = ({ rsvped, campaign, showBeachInfo, onRsvp, onUnRsvp }) => {
  const fillingFast = campaign.headCount >= campaign.maxParticipants / 2;

  const { uid, addCampaignRsvp, removeCampaignRsvp } = useContext(UserContext);

  const handleRsvp = useCallback(async () => {
    await rsvpCampaign(campaign.id, uid);
    addCampaignRsvp(campaign.id);
    if(onRsvp && typeof onRsvp === 'function') onRsvp(campaign.id);
  }, [campaign.id, uid]);

  const handleUnRsvp = useCallback(async () => {
    await unRsvpCampaign(campaign.id, uid);
    removeCampaignRsvp(campaign.id);
    if(onUnRsvp && typeof onUnRsvp === 'function') onUnRsvp(campaign.id);
  }, [campaign.id, uid]);

  return (
    <Box
      bgcolor="#302e2e"
      my={3}
      sx={{ borderRadius: "8px" }}
      p={3}
      width="100%"
      boxShadow="0 0 10px -2px #4cc229"
    >
      <Box>
        <Typography
          variant="h6"
          my={1}
          sx={{
            color: "#4cc229",
            fontWeight: "bold",
          }}
        >
          {campaign.title}
        </Typography>
        <Box
          my={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {fillingFast && (
            <Chip
              label="🔥 Filling Fast"
              sx={{
                background: "linear-gradient(45deg, purple, blue)",
                fontWeight: "bold",
                color: "white",
                borderRadius: "4px",
                mr: 2,
              }}
            />
          )}
          {rsvped && (
            <Chip
              label="Rsvp-ed"
              sx={{
                background: "lightgreen",
                fontWeight: "bold",
                color: "black",
                borderRadius: "4px",
                mr: 2,
              }}
            />
          )}
        </Box>
        <Typography variant="body2" color="gray">
          {new Date(campaign.campaignDate.toDate()).toLocaleDateString(
            "en-Us",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          )}
        </Typography>
        <Typography variant="body2" my={1} color="white">
          {campaign.description}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          my={1}
          color="white"
        >
          <Person htmlColor="#4cc229" sx={{ mr: 1 }} /> Maximum Participants :{" "}
          {campaign.maxParticipants}
        </Typography>
        <Typography
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          variant="body2"
          my={1}
          color="white"
        >
          <PersonAddAlt htmlColor="#4cc229" sx={{ mr: 1 }} /> Memebers
          Registered : {campaign.headCount}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {rsvped ? (
            <Button
              fullWidth
              onClick={handleUnRsvp}
              my={2}
              sx={{
                background: "red",
                color: "white",
                fontSize: ".8rem",
              }}
            >
              I'm Out
            </Button>
          ) : (
            <Button
              onClick={handleRsvp}
              fullWidth
              my={2}
              sx={{
                background: "#4cc229",
                color: "white",
                fontSize: ".8rem",
              }}
            >
              Count me in
            </Button>
          )}
        </Box>
      </Box>
      {showBeachInfo && (
        <Box
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
              {campaign.beachData.name}
            </Typography>
            <Typography color="white" variant="caption">
              {campaign.beachData.address}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CampaignCard;
