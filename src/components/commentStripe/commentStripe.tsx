import { Box, CircularProgress, Typography } from "@mui/material";
import { useRequest } from "ahooks";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getComments } from "~/api/commentActions";
import { Comment, CustomButton, StyledTextField } from "~/components/components";
import { Colors } from "~/constants/constants";
import { useWriteComment, useDeleteComment } from "~/hooks/hooks";
import { showNotification } from "~/store/slices/notificationSlice";

interface CommentStripeProps {
    exhibitId: number;
    refreshPost: (id: number) => void;
}

const CommentStripe: React.FC<CommentStripeProps> = ({ exhibitId, refreshPost }) => {
    const { data: comments, loading, error, refresh } = useRequest(() => getComments(exhibitId));;
    const { commentText, setCommentText, submitComment, loading: writing, error: writeError } = useWriteComment(exhibitId, refresh, refreshPost);
    const { deleteCommentById, loading: deleting, error: deleteError } = useDeleteComment(exhibitId, refresh, refreshPost);

    const dispatch = useDispatch();
    
    const handleSubmit = () => {
      if (commentText.trim()) {
        submitComment();
      }
    };

    const handleDelete = (commentId: number) => {
      deleteCommentById(commentId);
    };

    useEffect(() => {
      if (writeError) {
        setCommentText("");
        dispatch(showNotification({
          message: "Failed to write comment. Try to login",
          severity: "error",
        }))
      }
    }, [writeError]);
     
    return (
      <>
        {loading && comments && comments.length === 0 && (
          <CircularProgress size={24} />
        )}
        {error && (
          <Typography variant="body2" color="error">
            Failed to load comments.
          </Typography>
        )}
        {comments && comments.length > 0
          ? comments
              .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
              .map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  onDelete={() => handleDelete(comment.id)}
                />
              ))
          : !loading && (
              <Typography variant="body2" color="text.secondary">
                No comments yet.
              </Typography>
            )}

        {!error && (
          <Box mt={2} display="flex" alignItems="center" height={"40px"}>
            <StyledTextField
              label="Write a comment"
              variant="outlined"
              margin="normal"
              value={commentText}
              fullWidth
              onChange={(e) => setCommentText(e.target.value)}
              size="small"
              sx={{
                margin: 0,
                "& .MuiOutlinedInput-root": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  height: "40px",
                },
              }}
            />
            <CustomButton
              onClick={handleSubmit}
              disabled={writing || !commentText.trim()}
              sx={{
                margin: 0,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                height: "100%",
                border: `1px solid ${Colors.textPrimary}`,
                boxSizing: "border-box",
                borderLeft: "0",
              }}
            >
              {writing ? <CircularProgress size={20} /> : "Post"}
            </CustomButton>
          </Box>
        )}
      </>
    );
  };
  
  export { CommentStripe };