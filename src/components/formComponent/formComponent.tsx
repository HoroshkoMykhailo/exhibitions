import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { StyledTextField } from '~/components/components';
import { Colors } from "~/constants/constants";
import { UserRequest } from "~/types/types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

interface FormComponentProps {
  buttonLabel: string;
  linkText: string;
  onLinkClick: () => void;
  onSubmit: (userData: UserRequest) => void;
}

const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number"),
});

const FormComponent: React.FC<FormComponentProps> = ({ buttonLabel, linkText, onLinkClick, onSubmit }) => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "500px",
          }}
        >
          <Field
            name="username"
            as={StyledTextField}
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
          />
          <Field
            name="password"
            as={StyledTextField}
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: Colors.buttonColor,
              color: Colors.textPrimary,
              "&:hover": {
                backgroundColor: "#A8D88C",
              },
            }}
            fullWidth
          >
            {buttonLabel}
          </Button>
          <Typography
            onClick={onLinkClick}
            sx={{
              cursor: "pointer",
              mt: 2,
              color: Colors.textPrimary,
              "&:hover": { color: "#39A0ED" },
            }}
          >
            {linkText}
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

export { FormComponent }