import type { NextPage } from "next";
import { ShopLayout } from "../components/layout";
import styles from "../styles/Home.module.css";
import { Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <ShopLayout
      title={"Next-Shop - Home"}
      pageDescription={"The best place to buy clothes"}
    >
      <Typography variant="h1" component="h1" color="initial">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }} component="h1" color="initial">
        All Products
      </Typography>
    </ShopLayout>
  );
};

export default Home;
