import type { NextPage } from "next";
import { ShopLayout } from "../components/layout";
import { Typography } from "@mui/material";
import { initialData } from "../database/products";
import { ProductList } from "../components/products";

const Home: NextPage = () => {
  return (
    <ShopLayout
      title={"Next-Shop - Home"}
      pageDescription={"The best place to buy clothes"}
    >
      <Typography variant="h1" component="h1" color="initial">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }} component="h2" color="initial">
        All Products
      </Typography>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  );
};

export default Home;
