import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import BottomNav from "../components/BottomNav";
import { EditSharp, LocationOn, Waves } from "@mui/icons-material";
import { useContext } from "react";
import { BeachContext } from "../context/BeachContext";
import ThingToDoCard from "../components/ThingToDoCard";

const BeachProfile = () => {
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [showPofilePhotoDialog, setShowPofilePhotoDialog] = useState(false);

  const { name, email, address, profilePhotoUrl, thingsToDo } = useContext(
    BeachContext
  );

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
              {name?.substring(0, 1)}
            </Avatar>
          </Badge>
          
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
            &nbsp;{name}
          </Typography>

          <Typography
            variant="body2"
            my={2}
            color="white"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <LocationOn htmlColor="red" />
            &nbsp;{address}
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="white">
            Things To Do
          </Typography>
          <IconButton
            size="small"
            sx={{ width: 30, height: 30, background: "gray", ml: 2 }}
          >
            <EditSharp htmlColor="white" fontSize="4px" />
          </IconButton>
        </Box>
        {thingsToDo.map((ttd) => (
          <ThingToDoCard ttd={ttd} key={ttd.id} />
        ))}
      </Box>

      <BottomNav
        eventsHref="/beach/events"
        campHref="/beach/campaigns"
        profileHref="/beach/profile"
      />
    </>
  );
};

export default BeachProfile;
