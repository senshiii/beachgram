import { Menu } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import BottomNav from "../components/BottomNav";
import ProfileDrawer from "../components/ProfileDrawer";

const ProfileDetails = () => {
  return (
    <></>
  )
}

const Favorite = () => {

}

const Rsvp = () => {
  
}

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDisplay, setCurrentDisplay] = useState("profile");

  return (
    <>
      <ProfileDrawer
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSelect={(display) => setCurrentDisplay(display)}
      />
      <Box bgcolor="#29292b" p={2} minHeight="100vh" paddingBottom="10vh">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
          height="6vh"
        >
          <IconButton onClick={() => setIsOpen(true)}>
            <Menu htmlColor="white" />
          </IconButton>
        </Box>
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
