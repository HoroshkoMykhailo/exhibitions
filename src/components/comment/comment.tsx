import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/store/store";
import { type CommentI } from "~/types/types";
import DeleteIcon from "@mui/icons-material/Delete";

const Comment: React.FC<CommentI & { onDelete: () => void}> = ({onDelete, ...comment} ) => {
    const date = new Date(comment.createdAt);
    const data = `${date.getHours()}:${("0" + date.getMinutes()).slice(
      -2
    )} ${date.toLocaleString("en-US", {
      month: "long",
    })} ${date.getDate()} ${date.getFullYear()}`;

    const { user } = useSelector((state: RootState) => state.user);

    return (
      <Box
        key={comment.id}
        sx={{
          mb: 1,
          p: 1,
          borderBottom: "1px solid #ddd",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle2" color="text.primary">
            {comment.user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {comment.text}
        </Typography>
        {comment.user.id === user?.id && (
          <IconButton
            onClick={onDelete}
            sx={{ position: "absolute", bottom: 1, right: 5 }}
          >
            <DeleteIcon sx={{ fontSize: 20 }}/>
          </IconButton>
        )}
      </Box>
    );
}

export { Comment }