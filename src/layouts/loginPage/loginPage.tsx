import React from "react";
import { LoginForm } from "~/components/components";
import { Box } from "@mui/material";
import { UserRequest } from "~/types/types";

const LoginPage: React.FC = () => {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <LoginForm/>
    </Box>
  );
};

export { LoginPage };