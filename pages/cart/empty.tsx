import NextLink from "next/link";
import { Box, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layout";

import { RemoveShoppingCartOutlined } from "@mui/icons-material";

const EmptyPage = () => {
  return (
    <ShopLayout title="Cart Empty" pageDescription="There are not items here">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ textAlign: "center", display: "flex", flexDirection: "column" }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 70 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Cart Is Empty</Typography>
          <NextLink href="/cart" passHref>
            <Link typography="h6" color="secondary">
              Go Back!
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
