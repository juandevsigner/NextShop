import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import React from "react";
import { AuthLayout } from "../../components/layout";
import NextLink from "next/link";

const RegisterPage = () => {
  return (
    <AuthLayout title="Login">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Create Account
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Full Name" variant="filled" fullWidth />
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
            Create Account
          </Button>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end">
          <NextLink href="/auth/login" legacyBehavior passHref>
            <Link underline="always">Have account?</Link>
          </NextLink>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
