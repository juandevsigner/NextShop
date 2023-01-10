import type { NextPage } from "next";
import { ShopLayout } from "../../components/layout";
import { Typography } from "@mui/material";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui/FullScreenLoading";

const KidPage: NextPage = () => {
  const { isError, isLoading, products } = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      title={"Next-Shop - KidPage"}
      pageDescription={"The best place to buy clothes to kids"}
    >
      <Typography variant="h1" component="h1" color="initial">
        Shop
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }} component="h2" color="initial">
        Kids Products
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
