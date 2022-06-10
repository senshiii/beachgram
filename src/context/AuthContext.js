import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuth: false,
  onSignIn: () => {},
});

export default ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  return (
    <AuthContext.Provider value={{ isAuth, onSignIn: () => setIsAuth(true) }}>
      {children}
    </AuthContext.Provider>
  );
};
