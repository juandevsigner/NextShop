import React from "react";
import useSWR from "swr";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { Chip, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { GridColDef } from "@mui/x-data-grid/models";
import { IOrder } from "../../interfaces/order";
import { IUser } from "../../interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", width: 250 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "name", headerName: "Full Name", width: 200 },
  { field: "total", headerName: "Total Amount", width: 150 },
  {
    field: "isPaid",
    headerName: "Paid",
    renderCell: ({ row }) => {
      return row.isPaid ? (
        <Chip variant="outlined" color="success" label="Paid" />
      ) : (
        <Chip variant="outlined" color="error" label="Pending" />
      );
    },
  },
  { field: "noProducts", headerName: "No. Products", align: "center" },
  { field: "createdAt", headerName: "Created at", width: 150 },
  {
    field: "check",
    headerName: "Check Order",
    renderCell: ({ row }) => {
      return (
        <a href={`/admin/orders/${row.id}`} rel="noreferrer" target="_blank">
          Check Order
        </a>
      );
    },
  },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");

  if (!data && !error) return <></>;

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.orderItems.length,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title={"Orders"}
      subTitle={"Orders maintenance"}
      icon={<ConfirmationNumberOutlined />}
    >
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
    </AdminLayout>
  );
};

export default OrdersPage;
