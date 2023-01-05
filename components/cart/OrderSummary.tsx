import { Divider, Grid, Typography } from "@mui/material";
import React from "react";

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Product</Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography>3 items</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography>$156</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Taxes (19%)</Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography>$15</Typography>
      </Grid>
      <Divider sx={{ my: 1, width: "100%" }} />
      <Grid item xs={6}>
        <Typography variant="subtitle1">Total: (19%)</Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography variant="subtitle1">
          <strong>$255</strong>
        </Typography>
      </Grid>
    </Grid>
  );
};
