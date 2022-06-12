import { createContext, useState } from "react";

export const BeachContext = createContext({
  uid: "",
  name: "",
  address: "",
  email: "",
  profilePhotoUrl: "",
  thingsToDo: [],
  setDetails: (uid, name, address, email, profilePhotoUrl, thinsgToDo) => {},
});

export default ({ children }) => {
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhotoUrl, setprofilePhotoUrl] = useState("");
  const [thingsToDo, setThingsToDo] = useState([]);

  const setBeachDetails = (uid, name, address, email, profilePhotoUrl, thingsToDo) => {
    setUid(uid);
    setName(name);
    setAddress(address);
    setEmail(email);
    setprofilePhotoUrl(profilePhotoUrl);
    setThingsToDo(thingsToDo);
  };

  return (
    <BeachContext.Provider
      value={{
        uid,
        name,
        address,
        email,
        profilePhotoUrl,
        thingsToDo,
        setDetails: setBeachDetails,
      }}
    >
      {children}
    </BeachContext.Provider>
  );
};
