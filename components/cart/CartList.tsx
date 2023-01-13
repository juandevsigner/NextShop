import React, { FC, useContext } from "react";
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
import { ItemCounter } from "../ui";
import { CartContext } from "../../context";
import { ICartProduct, IOrderItem } from "../../interfaces";

interface Props {
  edit?: boolean;
  products?: any;
}

export const CartList: FC<Props> = ({ edit = false, products }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQunaitytValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const productToShow = products ? products : cart;

  return (
    <>
      {productToShow.map((product: any) => (
        <Grid
          container
          spacing={2}
          key={product.slug + product.sizes + Math.random()}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} legacyBehavior passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    sx={{ borderRadius: "5px" }}
                    component="img"
                    image={`/products/${product.image}`}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Size: <strong>{product.sizes}</strong>
              </Typography>
              {edit ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  updateQuantity={(newValue) =>
                    onNewCartQunaitytValue(product, newValue)
                  }
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity}{" "}
                  {product.quantity > 1 ? "products" : "product"}
                </Typography>
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
              <Button
                onClick={() => removeCartProduct(product)}
                variant="text"
                color="secondary"
              >
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
