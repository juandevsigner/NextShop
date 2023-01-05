import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { initialData } from "../../database/products";
import { ItemCounter } from "../ui";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  edit?: boolean;
}

export const CartList: FC<Props> = ({ edit = false }) => {
  return (
    <>
      {productsInCart.map((product) => (
        <Grid container spacing={2} key={product.slug} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    sx={{ borderRadius: "5px" }}
                    component="img"
                    image={`products/${product.images[0]}`}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Size: <strong>XL</strong>
              </Typography>
              {edit ? (
                <ItemCounter />
              ) : (
                <Typography variant="h5">4 Items</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">$ {product.price}</Typography>

            {edit && (
              <Button variant="text" color="secondary">
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
