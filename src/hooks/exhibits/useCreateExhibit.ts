import { useRequest } from "ahooks";
import { createExhibit } from "~/api/exhibitActions";
import { HTTPCode } from "~/constants/constants";

const useCreateExhibit = () => {
  const { run, data, error, loading } = useRequest(createExhibit, {
    manual: true,
  });

  const create = (description: string, image: File) => {
    run(description, image);
  };

  const errorResponse = data && 'status' in data && data.status === HTTPCode.BAD_REQUEST
    ? { message: 'message' in data && data.message || "Something went wrong" }
    : error;

  return { create, data, error: errorResponse, loading };
};

export { useCreateExhibit };