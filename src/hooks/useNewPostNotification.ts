import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "~/store/slices/notificationSlice"; 
import { AppDispatch } from "~/store/store";
import { socket } from "~/utils/socket"; 

export const useNewPostNotification = (
    page?: number,
    refresh?: () => void,
  ) => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      const handleNewPost = () => {
        dispatch(
          showNotification({
            message: "New post added",
            severity: "info",
          })
        )
        if ( page && refresh && page === 1) {
          refresh();
        }
      };
  
      socket.on("newPost", handleNewPost);
  
      return () => {
        socket.off("newPost", handleNewPost);
      };
    }, [dispatch, page]);
  };