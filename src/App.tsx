import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdvertsPage from "./pages/AdvertsPage";
import NewAdvertPage from "./pages/NewAdvertPage";
import AdvertPage from "./pages/AdvertPage";
import NotFoundPage from "./pages/NotFoundPage";
import Layout from "./components/Layout";

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
        <Route path="/adverts" element={<AdvertsPage />} />
        <Route path="/adverts/new" element={<NewAdvertPage />} />
        <Route path="adverts/:advertId" element={<AdvertPage />} />
        <Route path="/404" element={<NotFoundPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default App;
