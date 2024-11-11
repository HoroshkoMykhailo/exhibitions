import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { NewPostForm } from "~/components/components";
import { AppRoute } from "~/constants/constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "~/store/store";
import { showNotification } from "~/store/slices/notificationSlice";
import { useNavigate } from "react-router-dom";
import { useCreateExhibit } from "~/hooks/hooks";

const NewPost: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { create, data, error, loading } = useCreateExhibit();
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (values: { description: string; image: File | null }) => {
    if (values.image && values.description) {
      create(values.description, values.image);
    } else {
      dispatch(
        showNotification({
          message: "You must provide both image and description",
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    if (!loading) {
      if (data && !error) {
        navigate(AppRoute.STRIPE);
      } else if (error) {
        dispatch(
          showNotification({
            message: (error?.message as string) || "Something went wrong",
            severity: "error",
          })
        );
      }
    }
  }, [loading]);

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
      <NewPostForm
        imageUrl={imageUrl}
        onImageChange={handleImageChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}

export { NewPost }