import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import React from "react";
import { AccountCircle, CampaignSharp, WorkSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const BottomNav = ({ activeTabId }) => {
  const nav = useNavigate();
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100vw",
        height: "8vh",
      }}
    >
      <BottomNavigation
        sx={{ bgcolor: "#1d1d1d" }}
        showLabels
        value={activeTabId}
      >
        <BottomNavigationAction
          sx={{ color: "white" }}
          onClick={() => nav("/feed")}
          label="Events"
          icon={<EventIcon />}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          onClick={() => nav("/campaigns")}
          label="Campaigns"
          icon={<CampaignSharp />}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          onClick={() => nav("/work")}
          label="Jobs"
          icon={<WorkSharp />}
        />
        <BottomNavigationAction
          sx={{ color: "white" }}
          onClick={() => nav("/profile")}
          label="Profile"
          icon={<AccountCircle />}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomNav;
