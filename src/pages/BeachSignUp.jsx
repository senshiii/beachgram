import {
  Box,
  Typography,
  TextField,
  Link,
  Divider,
  Button,
} from "@mui/material";
import { useState, useCallback, useEffect, useContext } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { registerBeach } from "../api/auth";
import AuthPageBg from "../assets/auth-page-bg.jpg";
import { AuthContext } from "../context/AuthContext";
import { BeachContext } from "../context/BeachContext";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader/AuthHeader";

const BeachSignUp = () => {
  const { isAuth, onSignIn } = useContext(AuthContext);
  const { setDetails } = useContext(BeachContext);

  const nav = useNavigate();

  useEffect(() => {
    if (isAuth) {
      nav("/beach/profile");
    }
  }, [isAuth, nav]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const handleRegister = useCallback(async () => {
    setIsLoading(true);
    try {
      const { id, profilePhotoUrl } = await registerBeach(
        email,
        password,
        name,
        address
      );
      setDetails(id, name, address, email, profilePhotoUrl);
      onSignIn();
      setIsLoading(false);
    } catch (err) {
      setRegistrationError(err.message);
      setIsLoading(false);
      setPassword("");
      setConfirmPassword("");
    }
  }, [name, address, email, password, confirmPassword, registerBeach]);

  return (
    <Box width="100vw" height="100vh" position="relative" overflow="hidden">
      <img
        width="100%"
        height="100%"
        src={AuthPageBg}
        alt="Auth Page background beach"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
        }}
      >
        <AuthHeader />
        {/* REGISTRATION FORM */}
        <Box
          height="90vh"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "80%",
              background: "#fff",
              borderRadius: "6px",
            }}
          >
            <Typography
              sx={{
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
                color: "white",
                padding: 2,
                textAlign: "center",
                background: "black",
                width: "100%",
              }}
              variant="h5"
            >
              Beach Sign Up
            </Typography>
            {/* ERROR DISPLAY */}
            {registrationError && (
              <Box bgcolor="maroon" sx={{ py: 2, textAlign: "center" }}>
                <Typography color="white" variant="body2">
                  {registrationError}
                </Typography>
              </Box>
            )}
            <Box
              padding="1rem"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  my: 2,
                  width: "100%",
                  textAlign: "left",
                }}
              >
                Sign Up to create your beach account
              </Typography>
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                type="text"
                size="small"
                variant="outlined"
                label="Name"
                placeholder="Type your name here"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                type="text"
                size="small"
                variant="outlined"
                label="Address"
                placeholder="Type your address name here"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                size="small"
                variant="outlined"
                label="Email"
                type="email"
                placeholder="Type your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                size="small"
                variant="outlined"
                label="Passwod"
                placeholder="Type your password here"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                size="small"
                variant="outlined"
                label="Confirm Passwod"
                placeholder="Type your password again here"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                disabled={isLoading}
                onClick={handleRegister}
                variant="contained"
              >
                {isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
              <Typography variant="body2" mt={1}>
                Already have an account ? Sign In{" "}
                <Link href="/login/beach">here </Link>
              </Typography>
              <Divider
                flexItem
                orientation="horizontal"
                sx={{ mt: 2, display: "flex", alignItems: "center" }}
              >
                Or
              </Divider>
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                  textAlign: "center",
                }}
              >
                Sign In using&nbsp;
                <GoogleIcon sx={{ cursor: "pointer" }} />
              </Typography>
              <Typography variant="body2" mt={1}>
                Looking for a user account ? Sign Up{" "}
                <Link href="/register/user">here </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BeachSignUp;
