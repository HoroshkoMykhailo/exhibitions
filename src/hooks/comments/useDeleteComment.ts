import { useRequest } from "ahooks";
import { deleteComment } from "~/api/commentActions";

export const useDeleteComment = (
  exhibitId: number,
  refreshComments: () => void,
  refreshPost: (id: number) => void
) => {
  const { loading, error, run } = useRequest(
    async (id: number) => {
      await deleteComment(exhibitId, id);
      refreshComments();
      refreshPost(exhibitId);
    },
    { manual: true }
  );

  const deleteCommentById = (id: number) => {
    run(id);
  };

  return { deleteCommentById, loading, error };
};