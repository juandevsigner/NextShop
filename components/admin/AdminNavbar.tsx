import NextLink from "next/link";
import { AppBar, Toolbar, Box, Typography, Button } from "@mui/material";
import { UiContext } from "../../context";
import { useContext } from "react";

export const AdminNavbar = () => {
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

        <Box sx={{ flex: 1 }} />

        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
