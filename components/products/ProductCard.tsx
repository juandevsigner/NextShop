import NextLink from "next/link";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { FC, useMemo, useState } from "react";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const productImage = useMemo(() => {
    return isHover ? product.images[1] : product.images[0];
  }, [isHover, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Card>
        <NextLink
          href={`/product/${product.slug}`}
          legacyBehavior
          passHref
          prefetch={false}
        >
          <Link>
            <CardActionArea>
              <CardMedia
                className="fadeIn"
                component="img"
                image={productImage}
                alt={product.title}
                onLoad={() => setIsImageLoaded(true)}
              />
              {product.inStock === 0 && (
                <Chip
                  color="primary"
                  label="Dont Have Stock"
                  sx={{
                    position: "absolute",
                    zIndex: 99,
                    top: "10px",
                    left: "10px",
                  }}
                />
              )}
            </CardActionArea>
          </Link>
        </NextLink>
      </Card>

      <Box
        sx={{ mt: 1, display: isImageLoaded ? "block" : "none" }}
        className="fadeIn"
      >
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography>$ {product.price}</Typography>
      </Box>
    </Grid>
  );
};
