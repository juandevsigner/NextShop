import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context";
import { currency } from "../../utils";

export const OrderSummary = () => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products {numberOfItems}</Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? "Prodcuts" : "Product"}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal:</Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100})%
        </Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography>{currency.format(tax)}</Typography>
      </Grid>
      <Divider sx={{ my: 1, width: "100%" }} />
      <Grid item xs={6}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography variant="subtitle1">
          <strong> {currency.format(total)}</strong>
        </Typography>
      </Grid>
    </Grid>
  );
};
