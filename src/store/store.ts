import { configureStore } from '@reduxjs/toolkit';
import userReducer from '~/store/slices/userSlice';
import notificationReducer from '~/store/slices/notificationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    notification: notificationReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
