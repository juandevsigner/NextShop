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
  const { _id, isPaid, numberOfItems, shippingAddress, total, subTotal, tax } =
    order;
  return (
    <ShopLayout title="Order Resum" pageDescription="Order Resum">
      <Typography variant="h2" sx={{ mb: 2 }} component="h2">
        Order: {_id}
      </Typography>

      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resume ({numberOfItems})
                {numberOfItems! > 1 ? "Products" : "Product"}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box display="fex" justifyContent="space-between">
                <Typography variant="subtitle1">{}</Typography>
              </Box>
              <Typography>
                {shippingAddress.firstName}
                {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}
                {shippingAddress.address2 ? shippingAddress.address2 : ""}
              </Typography>
              <Typography>
                {shippingAddress.city} - {shippingAddress.zip}
              </Typography>
              <Typography> {shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary
                orderValues={{ numberOfItems, subTotal, total, tax }}
              />
              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="payment Done"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <Chip
                    sx={{ my: 2 }}
                    label="Payment Pending"
                    variant="outlined"
                    color="error"
                    icon={<CreditCardOffOutlined />}
                  />
                )}
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
