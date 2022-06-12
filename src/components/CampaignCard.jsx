import {
  DeleteSharp,
  EditSharp,
  Person,
  PersonAddAlt,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import CardThumb from "../assets/auth-page-bg.jpg";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { rsvpCampaign, unRsvpCampaign } from "../api/user";
import { useNavigate } from "react-router-dom";
import { getCampaignRsvpUsers } from "../api/campaigns";

const RSVPListDialog = ({ open, onClose, campId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getCampaignRsvpUsers(campId).then((users) => {
      setList(users);
      setIsLoading(false);
    });
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Campaign RSVP List</DialogTitle>
      {isLoading ? (
        <CircularProgress />
      ) : (
        list.map((user) => {
          return (
            <List key={user.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={user.profilePhotoUrl}>
                    {user.name?.first?.substring(0, 1)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.name?.first} ${user.name.last}`}
                  secondary={user.email}
                />
              </ListItem>
            </List>
          );
        })
      )}
      <Button mt={2} onClick={onClose}>
        Close
      </Button>
    </Dialog>
  );
};

const CampaignCard = ({
  rsvped,
  campaign,
  hideUserActions,
  showAdminControls,
  showBeachInfo,
  onRsvp,
  onUnRsvp,
}) => {
  const fillingFast = campaign.headCount >= campaign.maxParticipants / 2;
  const nav = useNavigate();

  const [showUserList, setShowUserList] = useState(false);

  const { uid, addCampaignRsvp, removeCampaignRsvp } = useContext(UserContext);

  const handleRsvp = useCallback(async () => {
    await rsvpCampaign(campaign.id, uid);
    addCampaignRsvp(campaign.id);
    if (onRsvp && typeof onRsvp === "function") onRsvp(campaign.id);
  }, [campaign.id, uid]);

  const handleUnRsvp = useCallback(async () => {
    await unRsvpCampaign(campaign.id, uid);
    removeCampaignRsvp(campaign.id);
    if (onUnRsvp && typeof onUnRsvp === "function") onUnRsvp(campaign.id);
  }, [campaign.id, uid]);

  return (
    <>
      <RSVPListDialog
        open={showUserList}
        onClose={() => setShowUserList(false)}
        campId={campaign.id}
      />
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
            {/* RSVP Badge */}
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
          {/* Campaign Date */}
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
          {!hideUserActions && (
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
          )}
          {showAdminControls && (
            <>
              <Button
                sx={{ my: 2 }}
                variant="outlined"
                onClick={() => setShowUserList(true)}
                fullWidth
              >
                Show RSVP List
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Button
                  fullWidth
                  sx={{ color: "yellow", borderColor: "yellow", mr: 1 }}
                  variant="outlined"
                  startIcon={<EditSharp />}
                >
                  Edit
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ ml: 1, color: "red", borderColor: "red" }}
                  startIcon={<DeleteSharp />}
                >
                  Delete
                </Button>
              </Box>
            </>
          )}
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
            onClick={() => nav(`/beach/${campaign.beachId}`)}
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
    </>
  );
};

export default CampaignCard;
