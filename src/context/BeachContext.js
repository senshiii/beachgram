import { createContext, useState } from "react";

export const BeachContext = createContext({
  uid: "",
  name: "",
  address: "",
  email: "",
  profilePhotoUrl: "",
  setDetails: (uid, name, address, email, profilePhotoUrl) => {},
});

export default ({ children }) => {
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhotoUrl, setprofilePhotoUrl] = useState("");

  const setBeachDetails = (uid, name, address, email, profilePhotoUrl) => {
    setUid(uid);
    setName(name);
    setAddress(address);
    setEmail(email);
    setprofilePhotoUrl(profilePhotoUrl);
  };

  return (
    <BeachContext.Provider
      value={{
        uid,
        name,
        address,
        email,
        profilePhotoUrl,
        setDetails: setBeachDetails,
      }}
    >
      {children}
    </BeachContext.Provider>
  );
};
