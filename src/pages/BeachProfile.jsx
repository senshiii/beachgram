import { Avatar, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import BottomNav from "../components/BottomNav";
import Image from "../assets/auth-page-bg.jpg";
import { LocationOn, Waves } from "@mui/icons-material";

const BeachProfile = () => {
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [showPofilePhotoDialog, setShowPofilePhotoDialog] = useState(false);
  return (
    <>
      <Box
        bgcolor="#29292b"
        p={2}
        pt={6}
        minHeight="100vh"
        paddingBottom="10vh"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar src={Image} sx={{ width: "100px", height: "100px" }}>
            D
          </Avatar>
          <Typography
            variant="h5"
            my={2}
            color="white"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Waves htmlColor="#2294e0" />
            &nbsp;Digha Beach
          </Typography>
          <Typography
            variant="body2"
            my={1}
            color="white"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <LocationOn htmlColor="red" />
            &nbsp;Digha, West Bengal, India
          </Typography>
          <Button
            startIcon={<FavoriteBorder />}
            sx={{ background: "red", color: "black", my:2 }}
          >
            Add To Favourites
          </Button>
        </Box>

        <Box>
          <Typography variant="h6" mt={2} color="white">
            Things To Do
          </Typography>
          {profile.thingsToDo.map((ttd) => (
            <ThingToDoCard ttd={ttd} key={ttd.id} />
          ))}
        </Box>

        <Box my={1}>
          <Typography variant="h6" mt={2} color="white">
            Upcoming Events
          </Typography>
          {profile.events.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </Box>

        <Box my={1}>
          <Typography variant="h6" mt={2} color="white">
            Upcoming Campaigns
          </Typography>
          {profile.campaigns.map((campaign) => (
            <CampaignCard campaign={campaign} key={campaign.id} />
          ))}
        </Box>
      </Box>

      <BottomNav
        eventsHref="/feed"
        campHref="/campaigns"
        profileHref="/profile"
      />
    </>
  );
};

export default BeachProfile;
