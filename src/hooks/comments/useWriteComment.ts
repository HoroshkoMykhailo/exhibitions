import { useRequest } from "ahooks";
import { useState } from "react";
import { writeComment } from "~/api/commentActions";

export const useWriteComment = (
  exhibitId: number,
  refreshComments: () => void,
  refreshPost: (id: number) => void
) => {
  const [commentText, setCommentText] = useState("");

  const {
    loading,
    error,
    run: submitComment,
  } = useRequest(
    async () => {
      await writeComment(exhibitId, commentText);
      setCommentText("");
      refreshComments();
      refreshPost(exhibitId);
    },
    { manual: true }
  );

  return { commentText, setCommentText, submitComment, loading, error };
};
