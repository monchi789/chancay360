import MainLayout from "@/components/shared/MainLayout";
import Home from "@/pages/Home";
import HomePublication from "@/pages/publications/HomePublication";
import CreatePublication from "@/pages/publications/CreatePublication";

import { Route, Outlet, Routes } from "react-router-dom";

const protectedRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/publications",
    element: <HomePublication />,
  },
  {
    path: "/publication",
    element: <CreatePublication />,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route
          element={
            <MainLayout>
              <Outlet />
            </MainLayout>
          }
        >
          {protectedRoutes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
