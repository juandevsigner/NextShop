import { Divider, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { useContext } from "react";
import { CartContext } from "../../context";
import { currency } from "../../utils";

interface Props {
  orderValues?: {
    numberOfItems: number | undefined;
    subTotal: number;
    total: number;
    tax: number;
  };
}

export const OrderSummary: FC<Props> = ({ orderValues }) => {
  const { numberOfItems, subTotal, total, tax } = useContext(CartContext);
  const summaryValues = orderValues
    ? orderValues
    : { numberOfItems, subTotal, total, tax };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Products {summaryValues.numberOfItems}</Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography>
          {summaryValues.numberOfItems!}{" "}
          {summaryValues.numberOfItems! > 1 ? "Prodcuts" : "Product"}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal:</Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography>{currency.format(summaryValues.subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100})%
        </Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography>{currency.format(summaryValues.tax)}</Typography>
      </Grid>
      <Divider sx={{ my: 1, width: "100%" }} />
      <Grid item xs={6}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item display="flex" justifyContent="end" xs={6}>
        <Typography variant="subtitle1">
          <strong> {currency.format(summaryValues.total)}</strong>
        </Typography>
      </Grid>
    </Grid>
  );
};
