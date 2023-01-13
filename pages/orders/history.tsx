import React from "react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { Typography, Grid, Chip, Link } from "@mui/material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid/models";
import { DataGrid } from "@mui/x-data-grid";
import { ShopLayout } from "../../components/layout";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Full Name", width: 300 },
  {
    field: "paid",
    headerName: "Payment",
    description: "The payment was done?",
    width: 200,
    renderCell: (params) => {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Not Paid" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "Show Order",
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return (
        <NextLink
          legacyBehavior
          href={`/orders/${params.row.orderId}`}
          passHref
        >
          <Link underline="always">Show Order</Link>
        </NextLink>
      );
    },
  },
  { field: "date", headerName: "Date", width: 100 },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, idx) => ({
    id: idx + 1,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id,
    date: order.createdAt,
  }));

  return (
    <ShopLayout title="Order History" pageDescription="Order History">
      <Typography sx={{ mb: 3 }} variant="h1" component="h1">
        Order History
      </Typography>
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
