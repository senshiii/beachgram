import { createContext, useCallback, useState } from "react";

export const UserContext = createContext({
  uid: "",
  name: {
    first: "",
    last: "",
  },
  email: "",
  profilePhotoUrl: "",
  eventRsvps: [],
  campaignRsvps: [],
  setDetails: (
    uid,
    firstName,
    lastName,
    email,
    profilePhotoUrl,
    eventRsvps,
    campaignRsvps
  ) => {},
  removeEventRsvp: (eventId) => {},
  addEventRsvp: (eventId) => {},
  removeCampaignRsvp: (capaignId) => {},
  addCampaignRsvp: (capaignId) => {},
});

export default ({ children }) => {
  const [uid, setUid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhotoUrl, setprofilePhotoUrl] = useState("");
  const [eventRsvps, setEventRsvps] = useState([]);
  const [campaignRsvps, setCampaignRsvps] = useState([]);

  const setUserDetails = (
    uid,
    firstName,
    lastName,
    email,
    profilePhotoUrl,
    eventRsvps,
    campaignRsvps
  ) => {
    setUid(uid);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setprofilePhotoUrl(profilePhotoUrl);
    setEventRsvps(eventRsvps);
    setCampaignRsvps(campaignRsvps);
  };

  const addEventRsvp = useCallback(
    (eventId) => {
      setEventRsvps([...eventRsvps, eventId]);
    },
    [eventRsvps]
  );

  const removeEventRsvp = useCallback(
    (eventId) => {
      setEventRsvps(eventRsvps.filter((eid) => eid !== eventId));
    },
    [eventRsvps]
  );

  const addCampaignRsvp = useCallback(
    (campaignId) => {
      setCampaignRsvps([...campaignRsvps, campaignId]);
    },
    [eventRsvps]
  );

  const removeCampaignRsvp = useCallback(
    (campaignId) => {
      setCampaignRsvps(campaignRsvps.filter((cid) => cid !== campaignId));
    },
    [eventRsvps]
  );

  return (
    <UserContext.Provider
      value={{
        uid,
        name: {
          first: firstName,
          last: lastName,
        },
        email,
        profilePhotoUrl,
        eventRsvps,
        campaignRsvps,
        setDetails: setUserDetails,
        addEventRsvp,
        removeEventRsvp,
        addCampaignRsvp,
        removeCampaignRsvp
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
