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
import { registerUser } from "../api/auth";
import AuthPageBg from "../assets/auth-page-bg.jpg";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader/AuthHeader";

const Register = () => {
  const { isAuth, onSignIn } = useContext(AuthContext);
  const { setDetails } = useContext(UserContext);

  const nav = useNavigate();

  useEffect(() => {
    if (isAuth) {
      nav("/feed");
    }
  }, [isAuth, nav]);

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(null);

  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const handleRegister = useCallback(async () => {
    let errorFree = true;
    if (!firstName) {
      errorFree = false;
      setFirstNameError("First name cannot be empty");
    } else {
      setFirstNameError("");
    }
    if (!lastName) {
      errorFree = false;
      setLastNameError("Last name cannot be empty");
    } else {
      setLastNameError("");
    }
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
    if (!confirmPassword) {
      errorFree = false;
      setConfirmPasswordError("Confirm password cannot be empty");
    } else {
      setConfirmPasswordError("");
    }
    if (password !== confirmPassword) {
      errorFree = false;
      setPasswordError("Password and confirm password do not match");
      setConfirmPasswordError("Password and confirm password do not match");
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
    }

    if (errorFree) {
      // submit
      setIsLoading(true);
      try {
        // Call API
        const { id, profilePhotoUrl } = await registerUser(
          firstName,
          lastName,
          email,
          password
        );
        // Set User Context
        setDetails(id, firstName, lastName, email, profilePhotoUrl);
        // Set Auth Context
        onSignIn();
        // Set Loading state
        setIsLoading(false);
      } catch (err) {
        setRegistrationError(err.message);
        setPassword("");
        setIsLoading(false);
        setConfirmPassword("");
      }
    }
  }, [firstName, lastName, email, password, confirmPassword, registerUser]);

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
              variant="h4"
            >
              Register
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
                Sign Up to create your user account
              </Typography>
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                type="text"
                size="small"
                variant="outlined"
                label="First Name"
                placeholder="Type your first name here"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                helperText={firstNameError}
                error={!!firstNameError}
              />
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                type="text"
                size="small"
                variant="outlined"
                label="Last Name"
                placeholder="Type your last name here"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                helperText={lastNameError}
                error={!!lastNameError}
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
              <TextField
                sx={{ mb: 2 }}
                fullWidth
                size="small"
                variant="outlined"
                label="Passwod"
                placeholder="Type your password here"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError}
              />
              <Button
                disabled={isLoading}
                onClick={handleRegister}
                variant="contained"
              >
                {isLoading ? "Signing Up..." : "Register"}
              </Button>
              <Typography variant="body2" mt={1}>
                Already have an account ? Sign In{" "}
                <Link href="/login/user">here </Link>
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
                Looking for a beach account ? Sign Up{" "}
                <Link href="/register/beach">here </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
