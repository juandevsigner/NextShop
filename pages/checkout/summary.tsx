import React from "react";
import { ShopLayout } from "../../components/layout/ShopLayout";
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

const SummaryPage = () => {
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
              <Typography variant="h2">Resume (3 Items)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="fex" justifyContent="space-between">
                <Typography variant="subtitle1">Adress Destination</Typography>
                <NextLink href="/checkout/address" passHref legacyBehavior>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <Typography>Juan Monsalve</Typography>
              <Typography>Any Place</Typography>
              <Typography>12th South</Typography>
              <Typography>New Zealand</Typography>
              <Typography>+7 145 126465</Typography>

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
