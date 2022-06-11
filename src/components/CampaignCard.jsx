import { Person, PersonAddAlt } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import CardThumb from "../assets/auth-page-bg.jpg";

const CampaignCard = ({ campaign, showBeachInfo }) => {
  const fillingFast = campaign.headCount >= campaign.maxParticipants / 2;

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
        {fillingFast && (
          <Box my={2}>
            <Chip
              label="🔥 Filling Fast"
              sx={{
                background: "linear-gradient(45deg, purple, blue)",
                fontWeight: "bold",
                color: "white",
                borderRadius: "4px",
              }}
            />
          </Box>
        )}
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
          <Button
            fullWidth
            my={2}
            sx={{
              background: "#4cc229",
              color: "white",
              fontSize: ".8rem",
            }}
          >
            I'm going
          </Button>
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
