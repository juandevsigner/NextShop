import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import React from "react";
import { AuthLayout } from "../../components/layout";
import NextLink from "next/link";

const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Log in
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="filled"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid item sx={{ my: 4 }} xs={12}>
          <Button
            color="secondary"
            size="large"
            fullWidth
            className="circular-btn"
          >
            Log in
          </Button>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end">
          <NextLink href="/auth/register" legacyBehavior passHref>
            <Link underline="always">Dont have account?</Link>
          </NextLink>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
