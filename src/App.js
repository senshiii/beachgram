import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import UserContext from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProtection from "./components/AuthProtection/AuthProtection";

const App = () => {
  return (
    <>
      <CssBaseline />
      <AuthContext>
        <UserContext>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/feed"
                element={
                  <AuthProtection>
                    <></>
                  </AuthProtection>
                }
              />
              <Route
                path="/campaign"
                element={
                  <AuthProtection>
                    <></>
                  </AuthProtection>
                }
              />
              <Route
                path="/profile"
                element={
                  <AuthProtection>
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
