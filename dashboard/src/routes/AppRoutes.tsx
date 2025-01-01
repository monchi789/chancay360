import MainLayout from "@/shared/layouts/MainLayout";
import {lazy, Suspense } from "react";
import {Routes, Route } from "react-router-dom";
import {PacmanLoader } from "react-spinners";
import ProtectedRoutes from "@/routes/ProtectedRoutes.tsx"
const Home = lazy(() => import("@/modules/home/pages/HomeMain"));
const GeneralType = lazy(
  () => import("@/modules/general-type/pages/GeneralTypeMain")
);
const Gallery = lazy(() => import("@/modules/gallery/pages/GalleryMain"));
const Client = lazy(() => import("@/modules/client/pages/ClientMain"));
const Login = lazy(() => import("@/modules/auth/pages/Login"));
const Publication = lazy(() => import("@/modules/publication/pages/PublicationMain"));
const User = lazy(() => import("@/modules/users/pages/UserMain"));
const PublicationCrear = lazy(() => import("@/modules/publication/components/PublicationCreate"));
const PublicationEditar = lazy(() => import("@/modules/publication/components/PublicationUpdate"));
const PopUp = lazy(() => import("@/modules/PopUp/pages/PopUpMain"));

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <PacmanLoader color="#FFA938"/>
        </div>
      }
    >
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/auth/callback' element={<Login/>}/>

        <Route element={
          <ProtectedRoutes>
            <MainLayout/>
          </ProtectedRoutes>
        }>
          <Route path="/" element={<Home/>}/>
          <Route path="/usuario" element={<User/>}/>
          <Route path="/tipo-general" element={<GeneralType/>}/>
          <Route path="/cliente" element={<Client/>}/>
          <Route path="/galeria" element={<Gallery/>}/>
          <Route path="/publicacion" element={<Publication/>}/>
          <Route path="/publicacion/crear" element={<PublicationCrear/>}/>
          <Route path="/publicacion/editar/:id" element={<PublicationEditar />} />
          <Route path="/popup" element={<PopUp/>}/>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

