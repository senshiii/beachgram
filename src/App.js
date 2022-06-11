import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import UserContext from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProtection from "./components/AuthProtection";
import Feed from "./pages/Feed";
import BeachSignUp from "./pages/BeachSignUp";
import BeachSignIn from "./pages/BeachSignIn";
import BeachProfile from "./pages/BeachProfile";
import BeachEvents from "./pages/BeachEvents";
import BeachContext from "./context/BeachContext";
import Campaigns from "./pages/Campaigns";
import BeachProfileDisplay from "./pages/BeachProfileDisplay";

const App = () => {
  return (
    <>
      <CssBaseline />
      <AuthContext>
        <UserContext>
          <BeachContext>
            <BrowserRouter>
              <Routes>
                <Route path="/login/user" element={<Login />} />
                <Route path="/register/user" element={<Register />} />
                <Route path="/login/beach" element={<BeachSignIn />} />
                <Route path="/register/beach" element={<BeachSignUp />} />
                {/* <Route
                  path="/feed"
                  element={
                    <AuthProtection redirectRoute="/login/user">
                      <Feed />
                    </AuthProtection>
                  }
                /> */}
                <Route path="/feed" element={<Feed />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route
                  path="/profile"
                  element={
                    <AuthProtection redirectRoute="/login/user">
                      <BeachProfile />
                    </AuthProtection>
                  }
                />
                {/* BEACH ROUTES   */}
                <Route path="/beach/:beachId" element={<BeachProfileDisplay />} />
                <Route
                  path="/beach/profile"
                  element={
                    // <AuthProtection redirectRoute="/login/beach">
                      <BeachProfile />
                    // </AuthProtection>
                  }
                />
                <Route
                  path="/beach/events"
                  element={
                    <AuthProtection redirectRoute="/login/beach">
                      <BeachEvents />
                    </AuthProtection>
                  }
                />
              </Routes>
            </BrowserRouter>
          </BeachContext>
        </UserContext>
      </AuthContext>
    </>
  );
};

export default App;
