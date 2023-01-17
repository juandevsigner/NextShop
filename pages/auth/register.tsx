import React, { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { signIn, getSession } from "next-auth/react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Chip,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../components/layout";
import { validations } from "../../utils";
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "../../context";

type FormData = {
  email: string;
  password: string;
  name: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    await signIn("credentials", { email, password });
    // const destination = router.query.p?.toString() || "/";
    // router.replace(destination);
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Create Account
              </Typography>
              {/* <Chip
                color="error"
                sx={{
                  width: "100%",
                  my: 1,
                  display: showError ? "flex" : "none",
                }}
                icon={<ErrorOutline />}
                label={errorMessage}
                className="fadeIn"
              /> */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("name", {
                  required: "Name is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                label="Full Name"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("email", {
                  required: "Email is required",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
                type="email"
                variant="filled"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                label="Password"
                type="password"
                variant="filled"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid item sx={{ my: 4 }} xs={12}>
            <Button
              type="submit"
              color="secondary"
              size="large"
              fullWidth
              className="circular-btn"
            >
              Create Account
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink
              href={
                router.query.p
                  ? `/auth/login?p=${router.query.p}`
                  : "/auth/login"
              }
              legacyBehavior
              passHref
            >
              <Link underline="always">Have account?</Link>
            </NextLink>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { p = "/" } = query;
  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default RegisterPage;
