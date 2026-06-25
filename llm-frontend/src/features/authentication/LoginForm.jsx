import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Container,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const emailError =
    email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordError = password.length > 0 && password.length < 8;
  const canSubmit = useMemo(
    () => email.length > 0 && password.length >= 8 && !emailError,
    [email, password, emailError],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: { xs: 4, md: 8 },
        background:
          "radial-gradient(circle at 18% 16%, rgba(197, 139, 89, 0.34), transparent 32%), radial-gradient(circle at 82% 8%, rgba(111, 61, 46, 0.18), transparent 30%), linear-gradient(135deg, #fff8f0 0%, #f7eadc 46%, #fffdf9 100%)",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={0}
          sx={{
            position: "relative",
            p: { xs: 3, sm: 5 },
            borderRadius: 6,
            border: "1px solid rgba(111, 61, 46, 0.14)",
            boxShadow: "0 28px 90px rgba(68, 34, 25, 0.16)",
            backdropFilter: "blur(20px)",
            background: "rgba(255, 253, 249, 0.86)",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 14,
              borderRadius: 5,
              border: "1px solid rgba(197, 139, 89, 0.18)",
              pointerEvents: "none",
            },
          }}
        >
          <Stack spacing={4} sx={{ position: "relative" }}>
            <Stack spacing={2.5} alignItems="center" textAlign="center">
              <Chip
                label="Members access"
                sx={{
                  bgcolor: "rgba(197, 139, 89, 0.16)",
                  color: "primary.dark",
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                }}
              />
              <Box>
                <Typography
                  variant="h1"
                  sx={{ fontSize: { xs: 38, sm: 52 }, mb: 1 }}
                >
                  Welcome back
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: 17, lineHeight: 1.65, maxWidth: 420 }}
                >
                  Sign in with your email and password to continue to your
                  secure workspace.
                </Typography>
              </Box>
            </Stack>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Stack spacing={2.25}>
                <TextField
                  label="Email address"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  error={emailError}
                  helperText={
                    emailError
                      ? "Enter a valid email address."
                      : "Use the email connected to your account."
                  }
                  autoComplete="email"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">@</InputAdornment>
                      ),
                    },
                  }}
                />

                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  error={passwordError}
                  helperText={
                    passwordError
                      ? "Password must be at least 8 characters."
                      : "Minimum 8 characters."
                  }
                  autoComplete="current-password"
                />

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.25}
                  justifyContent="space-between"
                  alignItems={{ xs: "stretch", sm: "center" }}
                  sx={{ pt: 0.5 }}
                >
                  <Link
                    href="#"
                    underline="hover"
                    sx={{ fontWeight: 800, color: "primary.dark" }}
                  >
                    I forgot my password
                  </Link>
                  <Link
                    href="#"
                    underline="hover"
                    sx={{ fontWeight: 800, color: "primary.dark" }}
                  >
                    I don’t have an account yet
                  </Link>
                </Stack>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={!canSubmit}
                  sx={{
                    mt: 1.5,
                    background:
                      "linear-gradient(135deg, #6f3d2e 0%, #a96d55 100%)",
                    transition: "transform 180ms ease, box-shadow 180ms ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 16px 34px rgba(111, 61, 46, 0.3)",
                    },
                  }}
                >
                  Sign in
                </Button>

                {submitted && canSubmit ? (
                  <Alert severity="success" sx={{ borderRadius: 3 }}>
                    Your sign-in form is ready to submit.
                  </Alert>
                ) : null}
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
