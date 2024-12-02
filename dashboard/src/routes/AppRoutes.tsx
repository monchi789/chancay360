import MainLayout from "@/shared/layouts/MainLayout";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const Home = lazy(() => import("@/modules/home/pages/HomeMain"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<PacmanLoader size={12} />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
