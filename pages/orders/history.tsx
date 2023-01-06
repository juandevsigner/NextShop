import React from "react";
import { ShopLayout } from "../../components/layout";
import { Typography, Grid, Chip, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid/models";
import NextLink from "next/link";

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
        <NextLink legacyBehavior href={`/orders/${params.row.id}`} passHref>
          <Link underline="always">Show Order</Link>
        </NextLink>
      );
    },
  },
];

const rows = [
  { id: "1", paid: true, fullname: "Juan Da" },
  { id: "2", paid: false, fullname: "Emma" },
  { id: "3", paid: true, fullname: "Maria" },
  { id: "4", paid: true, fullname: "Yeka" },
];

const HistoryPage = () => {
  return (
    <ShopLayout title="Order History" pageDescription="Order History">
      <Typography sx={{ mb: 3 }} variant="h1" component="h1">
        Order History
      </Typography>
      <Grid container>
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

export default HistoryPage;
