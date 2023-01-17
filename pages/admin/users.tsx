import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { PeopleOutlined } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid/models";
import { Grid, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { IUser } from "../../interfaces";
import nextshopApi from "../../api/nextshopApi";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) return <></>;

  const onRoleUpdate = async (userId: string, newRole: string) => {
    const previousUser = users.map((user) => ({ ...user }));

    const updateUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));
    setUsers(updateUsers);

    try {
      await nextshopApi.put("/admin/users", {
        userId,
        role: newRole,
      });
    } catch (error) {
      console.log("Role could not be updated");
      setUsers(previousUser);
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 400 },
    { field: "name", headerName: "Full Name", width: 300 },
    {
      field: "role",
      headerName: "Role",
      width: 300,
      renderCell: ({ row }) => {
        return (
          <Select
            value={row.role}
            label="Role"
            onChange={({ target }) => onRoleUpdate(row.id, target.value)}
            sx={{ width: "300px" }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="super-user">Super User</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="SEO">SEO</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title={"Users"}
      subTitle={"Users maintenance"}
      icon={<PeopleOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
