import {
  ArrowBackSharp,
  EditSharp,
  FastfoodSharp,
  Menu,
  SearchSharp,
  SurfingSharp,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { getMyRsvps } from "../api/user";
import BottomNav from "../components/BottomNav";
import ProfileDrawer from "../components/ProfileDrawer";
import { UserContext } from "../context/UserContext";
import EventCard from "../components/EventCard";
import CampaignCard from "../components/CampaignCard";

const ProfileDetails = ({ first, last, profilePhotoUrl, onClickMenu }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        height="6vh"
      >
        <IconButton onClick={onClickMenu}>
          <Menu htmlColor="white" />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <Avatar
              sx={{
                background: "orange",
                cursor: "pointer",
                width: 22,
                height: 22,
              }}
            >
              <EditSharp
                sx={{
                  fontSize: ".8rem",
                }}
              />
            </Avatar>
          }
        >
          <Avatar
            sx={{
              width: 80,
              height: 80,
            }}
            src={profilePhotoUrl}
          >
            {first?.substring(0, 1)}
          </Avatar>
        </Badge>
        <Typography
          my={2}
          color="white"
          variant="h6"
        >{`${first} ${last}`}</Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body1" color="white">
          What to do ?
        </Typography>
        <Box
          bgcolor="#1f2021"
          color="white"
          my={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 2,
            cursor: "pointer",
          }}
        >
          <Box>
            <SearchSharp htmlColor="lightseagreen" />
          </Box>
          <Box sx={{ flex: 1, ml: 3 }}>
            <Typography variant="h6" color="lightseagreen">
              Search
            </Typography>
            <Typography variant="body2" color="gray">
              Search for beaches near you
            </Typography>
          </Box>
        </Box>
        <Box
          bgcolor="#1f2021"
          color="white"
          my={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 2,
            cursor: "pointer",
          }}
        >
          <Box>
            <SurfingSharp htmlColor="lightblue" />
          </Box>
          <Box sx={{ flex: 1, ml: 3 }}>
            <Typography variant="h6" color="lightblue">
              Surfing
            </Typography>
            <Typography variant="body2" color="gray">
              Check out surfing areas near you
            </Typography>
          </Box>
        </Box>
        <Box
          bgcolor="#1f2021"
          color="white"
          my={2}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 2,
            cursor: "pointer",
          }}
        >
          <Box>
            <FastfoodSharp htmlColor="yellow" />
          </Box>
          <Box sx={{ flex: 1, ml: 3 }}>
            <Typography variant="h6" color="yellow">
              Restaurant
            </Typography>
            <Typography variant="body2" color="gray">
              Find superb beach restaurants which engulf you in a coastal
              atmosphere with splendid delicacies
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const GoBackHeader = ({ onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      height="6vh"
    >
      <IconButton onClick={onClick}>
        <ArrowBackSharp htmlColor="white" />
      </IconButton>
    </Box>
  );
};

const Rsvps = ({ uid, onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [eventRsvps, setEventRsvps] = useState([]);
  const [campaignRsvps, setCampaignRsvps] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getMyRsvps(uid).then(({ events, campaigns }) => {
      setEventRsvps(events);
      setCampaignRsvps(campaigns);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <GoBackHeader onClick={onBack} />
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
          <Typography my={2} variant="body2" color="white">
            Getting your Rsvps...
          </Typography>
        </Box>
      ) : (
        <>
          <Box my={1}>
            <Typography varaint="h6" color="white">
              Recent Event Rsvps
            </Typography>
            {eventRsvps.map((event) => (
              <EventCard
                onUnRsvp={(eventId) => {
                  setEventRsvps(
                    eventRsvps.filter((event) => event.id !== eventId)
                  );
                }}
                key={event.id}
                event={event}
                rsvped
              />
            ))}
          </Box>
          <Box my={1}>
            <Typography varaint="h6" color="white">
              Recent Campaign Rsvps
            </Typography>
            {campaignRsvps.map((camp) => (
              <CampaignCard
                onUnRsvp={(campId) => {
                  setCampaignRsvps(
                    campaignRsvps.filter((camp) => camp.id !== campId)
                  );
                }}
                key={camp.id}
                campaign={camp}
                rsvped
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
};

const Favorite = () => {};

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState("profile");
  const {
    uid,
    name: { first, last },
    profilePhotoUrl,
  } = useContext(UserContext);

  let ProfileView = null;
  switch (currentDisplay) {
    case "profile":
      ProfileView = (
        <ProfileDetails
          first={first}
          last={last}
          onClickMenu={() => setIsOpen(true)}
          profilePhotoUrl={profilePhotoUrl}
        />
      );
      break;
    case "rsvp":
      ProfileView = (
        <Rsvps uid={uid} onBack={() => setCurrentDisplay("profile")} />
      );
      break;
  }

  return (
    <>
      <ProfileDrawer
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSelect={(display) => {
          setIsOpen(false);
          setCurrentDisplay(display);
        }}
      />
      <Box bgcolor="#29292b" p={2} minHeight="100vh" paddingBottom="10vh">
        {ProfileView}
      </Box>
      <BottomNav
        activeTabId={2}
        eventsHref="/feed"
        campHref="/campaigns"
        profileHref="/profile"
      />
    </>
  );
};

export default Profile;
