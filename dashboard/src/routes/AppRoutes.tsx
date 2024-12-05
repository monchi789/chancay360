import MainLayout from "@/shared/layouts/MainLayout";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const Home = lazy(() => import("@/modules/home/pages/HomeMain"));
const GeneralType = lazy(
  () => import("@/modules/general-type/pages/GeneralTypeMain")
);
const Gallery = lazy(() => import("@/modules/gallery/pages/GalleryMain"));
const Client = lazy(() => import("@/modules/client/pages/ClientMain"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <PacmanLoader color="#FFA938" />
        </div>
      }
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tipo-general" element={<GeneralType />} />
          <Route path="/cliente" element={<Client />} />
          <Route path="/galeria" element={<Gallery />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
