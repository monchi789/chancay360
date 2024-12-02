import { Outlet } from "react-router-dom";
import AppSidebar from "../common/Sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/components/ui/sidebar";

const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-h-screen">
          <div className="p-5 bg-[#a8bef9] rounded-md m-1 shadow-md">
            <SidebarTrigger className="text-gray-700" />
          </div>
          <main className="flex-1 p-6 overflow-auto con">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
