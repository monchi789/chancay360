import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import logoWhite from "@/assets/images/logo-white.svg"

const items = [
  {
    title: "Inicio",
    url: "#",
    icon: Home,
  },
  {
    title: "Publicaciones",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Tipo General",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar className="bg-[#444ade]">
      <SidebarHeader className="items-center justify-center mt-5">
        <img src={logoWhite} alt="" className="h-14"/>
      </SidebarHeader>

      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupContent className="h-full">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton
                    asChild
                    className="w-full flex items-center px-4 py-2 text-white hover:bg-[#FFA938] rounded-md transition-colors duration-150"
                  >
                    <a href={item.url} className="flex items-center w-full">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
