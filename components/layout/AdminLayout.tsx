import { Title } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { AdminNavbar } from "../admin";
import { SideMenu } from "../ui/SideMenu";
interface Props {
  title: string;
  subTitle: string;
  icon?: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

export const AdminLayout: FC<Props> = ({ title, subTitle, icon, children }) => {
  return (
    <>
      <nav>
        <AdminNavbar />
      </nav>
      <SideMenu />
      <main
        style={{ margin: "80px auto", maxWidth: "1440px", padding: "0px 30px" }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon} <span style={{ marginLeft: 5 }}>{title}</span>
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {subTitle}{" "}
          </Typography>
        </Box>
        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  );
};
