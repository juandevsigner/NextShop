import React, { useContext, useEffect } from "react";
import { ShopLayout } from "../../components/layout/ShopLayout";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import NextLink from "next/link";
import { CartContext } from "../../context";
import { countries } from "../../utils/countries";
import Cookies from "js-cookie";

const SummaryPage = () => {
  const router = useRouter();
  const { shippingAddress, numberOfItems } = useContext(CartContext);

  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  if (!shippingAddress) {
    return <></>;
  }
  const { address, city, country, firstName, lastName, phone, zip, address2 } =
    shippingAddress;

  return (
    <ShopLayout title="Order Resum" pageDescription="Order Resum">
      <Typography variant="h1" component="h1">
        Order Summary
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resume ({numberOfItems}){" "}
                {numberOfItems > 1 ? "Products" : "Product"}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="fex" justifyContent="space-between">
                <Typography variant="subtitle1">Adress Destination</Typography>
                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <Typography>
                {firstName}
                {lastName}
              </Typography>
              <Typography>
                {address} - {address2 ? address2 : ""}
              </Typography>

              <Typography>{country}</Typography>
              <Typography>
                {city} - {zip}
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="fex" justifyContent="end">
                <NextLink href="/cart" passHref legacyBehavior>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
