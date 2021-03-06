import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Image from "../assets/auth-page-bg.jpg";
import { LocationOn, Waves } from "@mui/icons-material";
import BottomNav from "../components/BottomNav";
import { getBeachProfile } from "../api/beaches";
import ThingToDoCard from "../components/ThingToDoCard";
import EventCard from "../components/EventCard";
import CampaignCard from "../components/CampaignCard";
import { UserContext } from "../context/UserContext";

const BeachProfileDisplay = () => {
  const { beachId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState(null);
  const { eventRsvps, likedEvents, campaignRsvps } = useContext(UserContext);

  useEffect(() => {
    if (!loaded) {
      setIsLoading(true);
      getBeachProfile(beachId).then((profile) => {
        setIsLoading(false);
        setLoaded(true);
        setProfile(profile);
      });
    }
  }, [beachId]);

  if (!loaded || isLoading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="body2">Loading Profile...</Typography>
      </Box>
    );
  }

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
            &nbsp;{profile.name}
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
            &nbsp;{profile.address}
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" mt={2} color="white">
            Things To Do
          </Typography>
          {profile.thingsToDo.map((ttd) => (
            <ThingToDoCard ttd={ttd} key={ttd.id} />
          ))}
        </Box>

        {profile.events?.length > 0 ? (
          <Box my={1}>
            <Typography variant="h6" mt={2} color="white">
              Upcoming Events
            </Typography>
            {profile.events.map((event) => (
              <EventCard
                liked={likedEvents?.includes(event.id)}
                rsvped={eventRsvps?.includes(event.id)}
                event={event}
                key={event.id}
              />
            ))}
          </Box>
        ) : (
          <Box my={2}>
            <Typography variant="h6" mt={2} color="white">
              Upcoming Events
            </Typography>
            <Typography my={2} color="red" textAlign="center" variant="body1">Sorry, no events found</Typography>
          </Box>
        )}

        <Box my={1}>
          <Typography variant="h6" mt={2} color="white">
            Upcoming Campaigns
          </Typography>
          {profile.campaigns.map((campaign) => (
            <CampaignCard
              rsvped={campaignRsvps?.includes(campaign.id)}
              campaign={campaign}
              key={campaign.id}
            />
          ))}
        </Box>

        <Typography
          color="gray"
          textAlign="center"
          width="100%"
          variant="body2"
        >
          Contact us at : {profile.email}
        </Typography>
      </Box>

      <BottomNav
        eventsHref="/feed"
        campHref="/campaigns"
        profileHref="/profile"
      />
    </>
  );
};

export default BeachProfileDisplay;
