import { Box, CircularProgress, Typography } from "@mui/material";
import { ShopLayout } from "../layout";

export const FullScreenLoading = () => {
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
        <CircularProgress thickness={2} />
      </Box>
    </ShopLayout>
  );
};
