import { Box, Typography } from "@mui/material";
import React from "react";
import { ShopLayout } from "../components/layout";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Cuystom404 = () => {
  return (
    <ShopLayout
      title="Page Not Found"
      pageDescription="There is not have data to show"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ textAlign: "center", display: "flex", flexDirection: "column" }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 35 }} />
        <Typography variant="h1" fontSize={35} component="h1">
          404 |
          <span style={{ fontWeight: 200, marginLeft: 10 }}>
            Error: Page Not Found
          </span>
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Cuystom404;
