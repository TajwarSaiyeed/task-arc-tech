import { LoadingButton } from "@mui/lab";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const TableMUI = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setTimeout(() => {
        setUsers(data);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "1rem",
        gap: "1rem",
      }}
    >
      <LoadingButton
        disabled={users?.length > 0}
        loading={loading}
        sx={{ width: "200px" }}
        variant="outlined"
        onClick={fetchUsers}
      >
        {!users?.length > 0 ? "Fetch Users" : "Users Fetched"}
      </LoadingButton>

      {users?.length > 0 && (
        <TableContainer
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "50%",
            },
          }}
          component={Paper}
        >
          <Table
            sx={{
              width: "100%",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">User Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Website</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user?.name}
                  </TableCell>
                  <TableCell align="right">{user?.username}</TableCell>
                  <TableCell align="right">{user?.email}</TableCell>
                  <TableCell align="right">{user?.website}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TableMUI;
