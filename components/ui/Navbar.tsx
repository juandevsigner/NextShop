import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { UiContext } from "../../context";
import { useContext } from "react";

export const Navbar = () => {
  const { pathname } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink className="Navbar" href="/" passHref>
          <Typography variant="h6">Next |</Typography>
          <Typography sx={{ ml: 0.5 }} variant="h6">
            Shop
          </Typography>
        </NextLink>
        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink legacyBehavior href={`/category/men`} passHref>
            <Button color={pathname === "/category/men" ? "primary" : "info"}>
              Men
            </Button>
          </NextLink>
          <NextLink legacyBehavior href={`/category/women`} passHref>
            <Button color={pathname === "/category/women" ? "primary" : "info"}>
              Women
            </Button>
          </NextLink>
          <NextLink legacyBehavior href={`/category/kids`} passHref>
            <Button color={pathname === "/category/kids" ? "primary" : "info"}>
              Kids
            </Button>
          </NextLink>
        </Box>

        <Box sx={{ flex: 1 }} />
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink legacyBehavior href="/cart" passHref>
          <IconButton>
            <Badge badgeContent={2} color="secondary">
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </NextLink>
        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
