import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdvertsPage from "./pages/AdvertsPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import AdvertPage from "./pages/AdvertPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/layout/Layout";
import AuthRequire from "./components/auth/AuthRequire";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route index element={<Navigate to="/adverts" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/adverts"
          element={
            <AuthRequire>
              <AdvertsPage />
            </AuthRequire>
          }
        />
        <Route
          path="/adverts/new"
          element={
            <AuthRequire>
              <NewAdvertPage />
            </AuthRequire>
          }
        />
        <Route
          path="adverts/:advertId"
          element={
            <AuthRequire>
              <AdvertPage />
            </AuthRequire>
          }
        />
        <Route
          path="/404"
          element={
            <AuthRequire>
              <NotFoundPage />
            </AuthRequire>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default App;
