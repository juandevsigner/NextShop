import { Box, Button } from "@mui/material";
import React, { FC } from "react";
import { ISizes } from "../../interfaces";
interface Props {
  selectedSize?: ISizes;
  sizes: ISizes[];
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          color={selectedSize === size ? "primary" : "info"}
          size="small"
          key={size}
          sx={{ mb: 2 }}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
