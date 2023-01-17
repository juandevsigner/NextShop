import React, { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { ShopLayout } from "../../components/layout/ShopLayout";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import { CartList, OrderSummary } from "../../components/cart";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import nextshopApi from "../../axiosApi/nextshopApi";

export type OrderResponseBody = {
  id: string;

  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};

interface Props {
  order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();
  const { _id, isPaid, numberOfItems, shippingAddress, total, subTotal, tax } =
    order;

  const onOrderCompleted = async (details: OrderResponseBody) => {
    if (details.status !== "COMPLETED") {
      return alert("Dont have order completed");
    }
    setIsPaying(true);

    try {
      await nextshopApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order._id,
      });
      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
    }
  };

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
                <Box
                  sx={{ display: isPaying ? "flex" : "none" }}
                  display="flex"
                  justifyContent="center"
                  className="fadeIn"
                >
                  <CircularProgress />
                </Box>

                <Box
                  flexDirection="column"
                  sx={{
                    display: isPaying ? "none" : "flex",
                    flex: 1,
                  }}
                >
                  {isPaid ? (
                    <Chip
                      sx={{ my: 2 }}
                      label="payment Done"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details);
                          // console.log({ details });
                          // const name = details.payer.name!.given_name;
                          //alert(`Transaction completed by ${name}`);
                        });
                      }}
                    />
                  )}
                </Box>
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
