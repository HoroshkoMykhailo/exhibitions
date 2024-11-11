import { Box, Typography } from "@mui/material";
import React from "react";

const NotFound: React.FC = () => {
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
      <Typography variant="h1" color="primary">
        Not Found
      </Typography>
    </Box>
  );
};

export { NotFound }