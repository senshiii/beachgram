import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
} from "@mui/material";
import { useState, useCallback, useEffect, useContext } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import AuthPageBg from "../assets/auth-page-bg.jpg";
import { loginBeach } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader/AuthHeader";
import { BeachContext } from "../context/BeachContext";

const BeachSignIn = () => {
  const { isAuth, onSignIn } = useContext(AuthContext);
  const { setDetails } = useContext(BeachContext);

  const nav = useNavigate();

  useEffect(() => {
    if (isAuth) {
      nav("/beach/profile");
    }
  }, [isAuth, nav]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = useCallback(async () => {
    try {
      setIsLoading(true);
      const { id, name, address, profilePhotoUrl } = await loginBeach(
        email,
        password
      );
      setDetails(id, name, address, email, profilePhotoUrl);
      onSignIn();
      setIsLoading(false);
    } catch (err) {
      setLoginError(err.message);
      setIsLoading(false);
      setPassword("");
    }
  }, [email, password, loginBeach]);

  return (
    <Box width="100vw" height="100vh" position="relative" overflowX="hidden">
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
              variant="h4"
            >
              Beach Sign In
            </Typography>
            {/* ERROR DISPLAY */}
            {loginError && (
              <Box bgcolor="maroon" sx={{ py: 2, textAlign: "center" }}>
                <Typography color="white" variant="body2">
                  {loginError}
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
                Sign In to manage your beach account
              </Typography>
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

              <Button
                disabled={isLoading}
                onClick={handleSignIn}
                variant="contained"
              >
                {isLoading ? "Signing in.." : "Sign In"}
              </Button>
              <Typography variant="body2" mt={1}>
                Don&apos;t have an account ? Sign Up{" "}
                <Link href="/register/beach">here</Link>
              </Typography>
              <Divider
                flexItem
                orientation="horizontal"
                sx={{ mt: 2, display: "flex", alignItems: "center" }}
              >
                Or
              </Divider>
              <Box mt={2} textAlign="center">
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Sign In using&nbsp;
                  <GoogleIcon sx={{ cursor: "pointer" }} />
                </Typography>
              </Box>
              <Typography variant="body2" mt={1}>
                Looking for a user account ? Sign In{" "}
                <Link href="/login/user">here </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BeachSignIn;
