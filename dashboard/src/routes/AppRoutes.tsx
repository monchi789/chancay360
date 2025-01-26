import {lazy, Suspense} from "react";
import {Routes, Route} from "react-router-dom";
import {PacmanLoader} from "react-spinners";
import ProtectedRoutes from "@/routes/ProtectedRoutes.tsx";
import MainLayout from "@/shared/layouts/MainLayout";


const Home = lazy(() => import("@/modules/home/pages/HomeMain"));
const GeneralType = lazy(() => import("@/modules/general-type/pages/GeneralTypeMain"));
const Gallery = lazy(() => import("@/modules/gallery/pages/GalleryMain"));
const Client = lazy(() => import("@/modules/client/pages/ClientMain"));
const Login = lazy(() => import("@/modules/auth/pages/Login"));
const Publication = lazy(() => import("@/modules/publication/pages/PublicationMain"));
const User = lazy(() => import("@/modules/users/pages/UserMain"));
const Public = lazy(() => import("@/modules/public/pages/PublicMain"));
const PopUp = lazy(() => import("@/modules/PopUp/pages/PopUpMain"));
const PublicationCreate = lazy(() => import("@/modules/publication/components/PublicationCreate"));
const PublicationUpdate = lazy(() => import("@/modules/publication/components/PublicationUpdate"));

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
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<Login />} />
        <Route path="/public" element={<Public />} />

        {/* Rutas protegidas */}
        <Route
          element={
            <ProtectedRoutes>
              <MainLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="/" element={<Home />} />
          <Route
            path="/usuario"
            element={
              <ProtectedRoutes requiredRoles={["ADMIN"]}>
                <User />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/tipo-general"
            element={
              <ProtectedRoutes requiredRoles={["ADMIN"]}>
                <GeneralType />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cliente"
            element={
              <ProtectedRoutes requiredRoles={["GESTOR_CLIENTES", "ADMIN"]}>
                <Client />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/galeria"
            element={
              <ProtectedRoutes requiredRoles={["CREADOR_CONTENIDO", "ADMIN"]}>
                <Gallery />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/publicacion"
            element={
              <ProtectedRoutes requiredRoles={["CREADOR_CONTENIDO", "ADMIN"]}>
                <Publication />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/publicacion/crear"
            element={
              <ProtectedRoutes requiredRoles={["CREADOR_CONTENIDO", "ADMIN"]}>
                <PublicationCreate />
              </ProtectedRoutes>
            }
          />
           <Route
            path="/publicacion/editar/:id"
            element={
              <ProtectedRoutes requiredRoles={["CREADOR_CONTENIDO", "ADMIN"]}>
                <PublicationUpdate/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/popup"
            element={
              <ProtectedRoutes requiredRoles={["CREADOR_CONTENIDO", "ADMIN"]}>
                <PopUp />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
