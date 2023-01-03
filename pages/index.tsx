import type { NextPage } from "next";
import { ShopLayout } from "../components/layout";

import {
  Card,
  Grid,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { initialData } from "../database/products";

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
      <Grid container spacing={4}>
        {initialData.products.map(product => (
          <Grid item xs={6} sm={4} key={product.slug}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={`products/${product.images[0]}`}
                  alt={product.title}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ShopLayout>
  );
};

export default Home;
