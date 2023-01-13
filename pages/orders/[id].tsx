import React from "react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { ShopLayout } from "../../components/layout/ShopLayout";
import { getSession } from "next-auth/react";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { CartList, OrderSummary } from "../../components/cart";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  console.log(order);
  return (
    <ShopLayout title="Order Resum 12354" pageDescription="Order Resum">
      <Typography variant="h1" component="h1">
        Order: 1234as
      </Typography>
      <Chip
        sx={{ my: 2 }}
        label="Payment Pending"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      />
      <Chip
        sx={{ my: 2 }}
        label="payment Done"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />
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
                <h2>Pay</h2>
                <Chip
                  sx={{ my: 2 }}
                  label="payment Done"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
      session,
    },
  };
};
export default OrderPage;
