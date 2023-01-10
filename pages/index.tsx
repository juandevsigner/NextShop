import type { NextPage } from "next";
import { ShopLayout } from "../components/layout";
import { Typography } from "@mui/material";

import { ProductList } from "../components/products";
import { useProducts } from "../hooks";

import { FullScreenLoading } from "../components/ui/FullScreenLoading";

const Home: NextPage = () => {
  const { isError, isLoading, products } = useProducts("/products");

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
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Home;
