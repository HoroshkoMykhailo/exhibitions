import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { StyledTextField } from "~/components/components";
import { Colors } from "~/constants/constants";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";

interface NewPostFormProps {
  onSubmit: (values: { description: string; image: File | null }) => void;
  imageUrl: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const validationSchema = Yup.object({
  description: Yup.string().required("Description is required"),
  image: Yup.mixed<File>().required("An image is required").test("fileSize", "The file is too large", (value) => {
    if (value && value.size > 5 * 1024 * 1024) {
      return false;
    }
    return true;
  }),
});

const NewPostForm: React.FC<NewPostFormProps> = ({ onSubmit, imageUrl, onImageChange }) => {
  return (
    <Formik
      initialValues={{ description: "", image: null }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
      }}
    >
      {({ values, handleChange, errors, touched, setFieldValue }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "400px",
              maxWidth: "1000px",
              padding: 2,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                minHeight: "200px",
                border: "2px dashed",
                borderColor: Colors.buttonColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                marginBottom: 2,
                position: "relative",
              }}
              onClick={() => document.getElementById("file-input")?.click()}
            >
              {values.image && imageUrl? (
                <img
                  src={imageUrl}
                  alt="Selected"
                  style={{ width: "100%", maxHeight: "500px", objectFit: "contain" }}
                />
              ) : (
                <Typography variant="body1" color="textSecondary">
                  Click to select an image
                </Typography>
              )}
              <input
                id="file-input"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  onImageChange(e);
                  setFieldValue("image", e.target.files ? e.target.files[0] : null);
                }}
              />
            </Box>
            {errors.image && (
              <Typography
                variant="body2"
                color="error"
                sx={{ alignSelf: "flex-start" }}
              >
                {errors.image}
              </Typography>
            )}
            <Field
              name="description"
              as={StyledTextField}
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={values.description}
              onChange={handleChange}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
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
              Save
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export { NewPostForm };
