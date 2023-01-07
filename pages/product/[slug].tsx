import React, { FC } from "react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { Button, Chip, Grid, Typography, Box } from "@mui/material";
import { ShopLayout } from "../../components/layout";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui/ItemCounter";
import { IProduct } from "../../interfaces";
import { dbProducts } from "../../database/intex";

interface Props {
  product: IProduct;
}

const ProductPage: FC<Props> = ({ product }) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              $ {product.price}
            </Typography>
            <Box sx={{ my: "2" }}>
              <Typography variant="subtitle1" component="h2">
                Quantity
              </Typography>
              <ItemCounter />
              <SizeSelector sizes={product.sizes} />
            </Box>
            <Button color="secondary" className="circular-btn">
              Add To Cart
            </Button>
            {/* <Chip label="Dont have stock" color="error" variant="outlined" /> */}
            <Box sx={{ mt: 3 }}>
              <Typography fontWeight={700} variant="subtitle2">
                Description:
              </Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

//THIS IS SERVER SIDE PROPS
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   console.log(params);

//   const { slug = "" } = params as { slug: string };
//   const product = await dbProducts.getProductBbySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };
  const product = await dbProducts.getProductBbySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
