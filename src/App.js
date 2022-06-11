import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import UserContext from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProtection from "./components/AuthProtection/AuthProtection";
import Feed from "./pages/Feed";
import BeachSignUp from "./pages/BeachSignUp";
import BeachSignIn from "./pages/BeachSignIn";

const App = () => {
  return (
    <>
      <CssBaseline />
      <AuthContext>
        <UserContext>
          <BrowserRouter>
            <Routes>
              <Route path="/login/user" element={<Login />} />
              <Route path="/register/user" element={<Register />} />
              <Route path="/login/beach" element={<BeachSignIn />} />
              <Route path="/register/beach" element={<BeachSignUp />} />
              <Route path="/feed" element={<Feed />} />
              <Route
                path="/campaign"
                element={
                  <AuthProtection redirectRoute="/login/user">
                    <></>
                  </AuthProtection>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthProtection redirectRoute="/login/user">
                    <></>
                  </AuthProtection>
                }
              />
            </Routes>
          </BrowserRouter>
        </UserContext>
      </AuthContext>
    </>
  );
};

export default App;
