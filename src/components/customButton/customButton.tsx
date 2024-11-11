import React from "react";
import { Button, SxProps, Typography } from "@mui/material";
import { Colors } from "~/constants/constants";
import { Link } from "react-router-dom";

interface CustomButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    width?: string | number;
    height?: string | number;
    fontSize?: string | number;
    link?: string;
    disabled?: boolean;
    sx?: SxProps;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  width = 100,
  fontSize = "1.2rem",
  height = 40,
  link,
  disabled = false,
  sx
}) => {
  return (
    <Button
      onClick={onClick}
      component={link ? Link : "button"}
      to={link ? link : undefined}
      disabled={disabled}
      sx={{
        backgroundColor: Colors.buttonColor,
        color: Colors.textPrimary,
        width: width,
        height: height,
        ...sx,
      }}
    >
      <Typography sx={{ fontSize: fontSize }}>{children}</Typography>
    </Button>
  );
};

export { CustomButton };