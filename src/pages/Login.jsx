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
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isAuth, onSignIn } = useContext(AuthContext);
  const { setDetails } = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    if (isAuth) {
      nav("/feed");
    }
  }, [isAuth, nav]);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = useCallback(async () => {
    let errorFree = true;
    if (!email) {
      errorFree = false;
      setEmailError("Email cannot be empty");
    } else {
      setEmailError("");
    }

    if (!password) {
      errorFree = false;
      setPasswordError("Password cannot be empty");
    } else {
      setPasswordError("");
    }

    if (errorFree) {
      setIsLoading(true);
      try {
        const {
          id,
          name: { first, last },
          profilePhotoUrl,
          accountType,
        } = await loginUser(email, password);
        setDetails(id, first, last, email, profilePhotoUrl, accountType);
        onSignIn();
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setPassword("");
        setLoginError(err.message);
      }
    }
  }, [email, password, loginUser]);

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
        {/* HEADER */}
        <Box
          bgcolor="white"
          width="100%"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          height="8vh"
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
            }}
          >
            Beachgram
          </Typography>
        </Box>
        {/* REGISTRATION FORM */}
        <Box
          height="92vh"
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
              paddingBottom: 4,
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
              Login
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
                helperText={emailError}
                error={!!emailError}
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
                helperText={passwordError}
                error={!!passwordError}
              />

              <Button
                disabled={isLoading}
                onClick={handleSignIn}
                variant="contained"
              >
                {isLoading ? "Signin in.." : "Login"}
              </Button>
              <Typography variant="body2" mt={1}>
                Don&apos;t have an account ? Sign Up{" "}
                <Link href="/register">here</Link>
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
