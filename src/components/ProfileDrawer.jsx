import { FavoriteBorderSharp, RsvpSharp } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import React from "react";

const ProfileDrawer = ({ isOpen, onSelect, onClose }) => {

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        width: "80vw !important",
      }}
    >
      <List>
        <ListItem>
          <ListItemButton onClick={() => onSelect("favorites")} >
            <ListItemIcon>
              <FavoriteBorderSharp />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => onSelect("rsvp")} >
            <ListItemIcon>
              <RsvpSharp />
            </ListItemIcon>
            <ListItemText primary="My Rsvps" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default ProfileDrawer;
