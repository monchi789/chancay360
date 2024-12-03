import { Outlet } from "react-router-dom";
import AppSidebar from "../common/Sidebar";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { ProfileImage } from "./components/Avatar";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <main className="flex-1 p-4 overflow-auto con">
            <div className="flex justify-end p-2">
              <ProfileImage />
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
