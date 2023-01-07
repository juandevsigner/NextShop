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
  ListItem,
  Input,
  InputAdornment,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { UiContext } from "../../context";
import { useContext, useState } from "react";

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

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

        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
          className="fadeIn"
        >
          <NextLink legacyBehavior href={`/category/men`} passHref>
            <Button color={asPath === "/category/men" ? "primary" : "info"}>
              Men
            </Button>
          </NextLink>
          <NextLink legacyBehavior href={`/category/women`} passHref>
            <Button color={asPath === "/category/women" ? "primary" : "info"}>
              Women
            </Button>
          </NextLink>
          <NextLink legacyBehavior href={`/category/kids`} passHref>
            <Button color={asPath === "/category/kids" ? "primary" : "info"}>
              Kids
            </Button>
          </NextLink>
        </Box>

        <Box sx={{ flex: 1 }} />

        <IconButton
          onClick={toggleSideMenu}
          sx={{ display: { xs: "flex", sm: "none" } }}
        >
          <SearchOutlined />
        </IconButton>

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            autoFocus
            className="fadeIn"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            type="text"
            placeholder="Search..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            className="fadeIn"
            onClick={() => setIsSearchVisible(true)}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

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
