import { Routes, Route, Outlet } from "react-router-dom";
import Header from "../components/Header";
import HomePage from "../pages/HomePage";
import Explore from "../pages/Explore";
import Dashboard from "../pages/Dashboard";
import SigninPage from "../features/auth/SigninPage";
import SignupPage from "../features/auth/SignupPage";
import PublicRoute from "../features/auth/PublicRoute";
import PrivateRoute from "../features/auth/PrivateRoute";
import { SearchProvider } from "../contexts/SearchContext";

function MainLayout() {
  return (
    <>
      <Header />
      <main className="absolute top-20 bottom-0 right-0 left-0 scroll-auto grid">
        <Outlet />
      </main>
    </>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>

      {/* Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/explore"
          element={
            <SearchProvider>
              <Explore />
            </SearchProvider>
          }
        />

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
