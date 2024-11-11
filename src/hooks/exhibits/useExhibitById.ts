import { useRequest } from "ahooks";
import { fetchExhibitById } from "~/api/exhibitActions";

const useExhibitById = (id: number) => {
    const { data, error, loading, run } = useRequest(() => fetchExhibitById(id), {
        manual: true,
      });
    
      const refreshExhibit = () => {
        run();
      };
    
      return { exhibit: data, error, loading, refreshExhibit };
};

export { useExhibitById }