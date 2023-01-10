import type { NextPage, GetServerSideProps } from "next";
import { ShopLayout } from "../../components/layout";
import { Box, Typography } from "@mui/material";
import { ProductList } from "../../components/products";

import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces/products";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={"Next-Shop - SearchPage"}
      pageDescription={"The best place to buy clothes"}
    >
      <Typography variant="h1" component="h1" color="initial">
        Search Products
      </Typography>
      {foundProducts ? (
        <Typography
          variant="h2"
          sx={{ mb: 1, textTransform: "capitalize" }}
          component="h2"
          color="initial"
        >
          Term: {query}
        </Typography>
      ) : (
        <>
          <Box display="flex">
            <Typography
              variant="h2"
              sx={{ mb: 1 }}
              component="h2"
              color="initial"
            >
              Not Found Products:
            </Typography>
            <Typography
              color="secondary"
              sx={{ mb: 1, ml: 1, textTransform: "capitalize" }}
            >
              {query}
            </Typography>
          </Box>
          <Typography sx={{ mb: 2 }}>These are our recommends</Typography>
        </>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
