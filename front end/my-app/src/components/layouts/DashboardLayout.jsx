import React from "react";
import NavBar from "../common/NavBar";
import { Box } from "@mui/system";

function DashboardLayout({children}) {
  return (
    <>
      <NavBar />
      <Box component='main'>
        {children}
      </Box>
    </>
  );
}

export default DashboardLayout;
