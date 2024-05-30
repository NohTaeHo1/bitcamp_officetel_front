"use client";

import { IUser } from "@/app/components/user/model/user";
import UserColumns from "@/app/components/user/module/columns";
import { findAllUsers } from "@/app/components/user/service/user.service";
import { getAllUsers } from "@/app/components/user/service/user.slice";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UsersPage: NextPage = () => {

  const dispatch = useDispatch();
  const allUsers: [] = useSelector(getAllUsers);

  useEffect(() => {
    dispatch(findAllUsers(1));
  }, []);

  return (
    <>
      <Box sx={{ height: 400, width: "100%" }}>
        {allUsers && (
          <DataGrid
            rows={allUsers}
            columns={UserColumns()}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        )}
      </Box>
    </>
  );
}

export default UsersPage;
