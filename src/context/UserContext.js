import { createContext, useState } from "react";

export const UserContext = createContext({
  uid: "",
  name: {
    first: "",
    last: "",
  },
  email: "",
  profilePhotoUrl: "",
  accountType: "",
  setDetails: () => {}
});

export default ({ children }) => {
  const [uid, setUid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhotoUrl, setprofilePhotoUrl] = useState("");
  const [accountType, setAccountType] = useState("");

  const setUserDetails = (
    uid,
    firstName,
    lastName,
    email,
    profilePhotoUrl,
    accountType
  ) => {
    setUid(uid);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setprofilePhotoUrl(profilePhotoUrl);
    setAccountType(accountType);
  };

  return (
    <UserContext.Provider
      value={{
        uid,
        name: {
          first: firstName,
          last: lastName,
        },
        email,
        accountType,
        profilePhotoUrl,
        setDetails: setUserDetails
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
