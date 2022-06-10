import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import UserContext from "./context/UserContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'


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
              <ProtectedRoute path="/feed" element={null} />
              <ProtectedRoute path="/profile" element={null} />
            </Routes>
          </BrowserRouter>
        </UserContext>
      </AuthContext>
    </>
  );
};

export default App;
