import React, { FC, useState, useContext } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Button, Chip, Grid, Typography, Box } from "@mui/material";
import { CartContext } from "../../context/cart/CartContext";
import { ShopLayout } from "../../components/layout";
import { ProductSlideshow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui/ItemCounter";
import { ICartProduct, IProduct, ISizes } from "../../interfaces";
import { dbProducts } from "../../database/intex";

interface Props {
  product: IProduct;
}

const ProductPage: FC<Props> = ({ product }) => {
  const { addProductToCart } = useContext(CartContext);
  const router = useRouter();
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    sizes: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = (size: ISizes) => {
    setTempCartProduct((currenProducts) => ({
      ...currenProducts,
      sizes: size,
    }));
  };

  const onAddProduct = () => {
    if (!tempCartProduct.sizes) return;
    addProductToCart(tempCartProduct);
    //router.push("/cart");
  };

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currenProducts) => ({
      ...currenProducts,
      quantity,
    }));
  };

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
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updateQuantity={onUpdateQuantity}
                maxValue={product.inStock > 10 ? 10 : product.inStock}
              />
              <SizeSelector
                onSelectedSize={selectedSize}
                selectedSize={tempCartProduct.sizes}
                sizes={product.sizes}
              />
            </Box>
            {product.inStock > 0 ? (
              <Button
                onClick={onAddProduct}
                color="secondary"
                className="circular-btn"
              >
                {tempCartProduct.sizes ? "Add To Cart" : "Choice a size"}
              </Button>
            ) : (
              <Chip label="Dont have stock" color="error" variant="outlined" />
            )}

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
