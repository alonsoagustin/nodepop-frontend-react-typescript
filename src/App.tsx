import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/layout/Layout";
import SignupPage from "./pages/SignupPage";
import AuthRequire from "./components/auth/AuthRequire";
import AdvertsPage from "./pages/AdvertsPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import AdvertPage from "./pages/AdvertPage";
import NotFoundPage from "./pages/NotFoundPage";

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
        <Route index element={<Navigate to={"/adverts"} />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="adverts" element={<Outlet />}>
          <Route
            index
            element={
              <AuthRequire>
                <AdvertsPage />
              </AuthRequire>
            }
          />
          <Route
            path="new"
            element={
              <AuthRequire>
                <NewAdvertPage />
              </AuthRequire>
            }
          />
          <Route
            path=":advertId"
            element={
              <AuthRequire>
                <AdvertPage />
              </AuthRequire>
            }
          />
        </Route>
        <Route
          path="404"
          element={
            <AuthRequire>
              <NotFoundPage />
            </AuthRequire>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={"/404"} />} />
    </Routes>
  );
};

export default App;
