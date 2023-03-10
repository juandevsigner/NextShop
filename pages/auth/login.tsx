import React, { useContext, useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { signIn, getSession, getProviders } from "next-auth/react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  Chip,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../components/layout";
import { validations } from "../../utils";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  //const { loginUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);

  const [providers, setProviders] = useState<any>({});
  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);
    // const isValidLogin = await loginUser(email, password);
    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => {
    //     setShowError(false);
    //   }, 3000);
    //   return;
    // }

    // const destination = router.query.p?.toString() || "/";
    // router.replace(destination);

    await signIn("credentials", { email, password });
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component="h1">
                Log in
              </Typography>

              <Chip
                color="error"
                sx={{
                  width: "100%",
                  my: 1,
                  display: showError ? "flex" : "none",
                }}
                icon={<ErrorOutline />}
                label="The credentials are not valid"
                className="fadeIn"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "Password is required",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>

          <Grid item sx={{ my: 2 }} xs={12}>
            <Button
              type="submit"
              color="secondary"
              size="large"
              fullWidth
              className="circular-btn"
            >
              Log in
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="column"
            justifyContent="end"
          >
            {Object.values(providers).map((provider: any) => {
              if (provider.id === "credentials")
                return <div key="credentilas"></div>;
              return (
                <Button
                  sx={{ borderRadius: "30px", padding: "7px 0", my: 1 }}
                  fullWidth
                  color="primary"
                  key={provider.id}
                  onClick={() => signIn(provider.id)}
                >
                  {provider.name}
                </Button>
              );
            })}
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end">
            <NextLink
              href={
                router.query.p
                  ? `/auth/register?p=${router.query.p}`
                  : "/auth/register"
              }
              legacyBehavior
              passHref
            >
              <Link underline="always">Dont have account?</Link>
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

export default LoginPage;
