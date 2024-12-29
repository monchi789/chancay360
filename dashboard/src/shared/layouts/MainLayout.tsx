import { Outlet } from "react-router-dom";
import AppSidebar from "../common/Sidebar";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { ToastProvider } from "@/shared/common/Toast"; // Importa el ToastProvider
import { ProfileImage } from "./components/Avatar";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <ToastProvider> 
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col h-screen">
            <div className="flex justify-end p-4 border-gray-200">
              <ProfileImage />
            </div>
            <main className="flex-1 p-4 overflow-y-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </ToastProvider>
    </SidebarProvider>
  );
};

export default MainLayout;
