import React, { useEffect } from "react";
import { CustomAlert, ProtectedRoute } from "~/components/components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppRoute } from "~/constants/constants";
import {
  HomePage,
  LoginPage,
  NewPost,
  NotFound,
  RegisterPage,
  StripePage,
} from "./layouts/layouts";
import { useDispatch } from "react-redux";
import { AppDispatch } from "~/store/store";
import { fetch } from "~/store/slices/userSlice";
import { useNewPostNotification } from "./hooks/useNewPostNotification";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  useNewPostNotification();

  return (
    <Router>
      <Routes>
        <Route path={AppRoute.STRIPE} element={<StripePage />} />
        <Route path={AppRoute.LOGIN} element={<LoginPage />} />
        <Route path={AppRoute.REGISTER} element={<RegisterPage />} />
        <Route
          path={AppRoute.HOME}
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppRoute.NEW_POST}
          element={
            <ProtectedRoute>
              <NewPost />
            </ProtectedRoute>
          }
        />
        <Route path={AppRoute.ANY} element={<NotFound />} />
      </Routes>
      <CustomAlert />
    </Router>
  );
};

export default App;
