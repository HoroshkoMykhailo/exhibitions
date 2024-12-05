import { useRequest } from "ahooks";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteExhibit, fetchExhibits } from "~/api/exhibitActions";
import { ControlBar, ExhibitsList } from "~/components/components";
import { pageLimit } from "~/constants/constants";
import { useNewPostNotification } from "~/hooks/hooks";
import { RootState } from "~/store/store";

const StripePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page") ?? "1", 10);

  const { data, loading, error, refresh } = useRequest(
    () => fetchExhibits(page, pageLimit, false),
    { refreshDeps: [page] }
  );

  const { run: deletePost } = useRequest(deleteExhibit, {
    manual: true,
    onSuccess: () => {
      refresh();
    },
  });

  useNewPostNotification(page, refresh);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    navigate(`/?page=${value}`);
  };

  const handleDeleteExhibit = (id: number) => {
    deletePost(id);
  };

  return (
    <>
      <ControlBar isAuthenticated={isAuthenticated} />
      <ExhibitsList
        exhibits={data?.exhibits}
        loading={loading}
        error={error?.message}
        page={page}
        lastPage={data?.lastPage ?? 1}
        onPageChange={handlePageChange}
        onDeleteExhibit={handleDeleteExhibit}
      />
    </>
  );
};

export { StripePage };
