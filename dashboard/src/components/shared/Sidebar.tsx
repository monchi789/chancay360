import {
  Calendar,
  ChevronDown,
  Home,
  Inbox,
  InboxIcon,
  Search,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Footer } from "./Footer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import chancayLogo from '../../assets/images/chancay_logo.webp';

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Publicaciones",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
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

export function AppSidebar() {
  return (
    <Sidebar className="bg-grain-brown-50">
      <SidebarHeader className="bg-grain-brown-50">
        <img src={chancayLogo} alt="Logo de Chancay360" className="p-2"/>
      </SidebarHeader>
      <SidebarContent className="bg-grain-brown-50">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger>
                      <InboxIcon/> <span className="ml-4 text-lg">Publicaciones</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenuItem>
                        <a
                          href="/publication"
                          className="block px-3 py-2 text-base text-gray-700 rounded-md hover:bg-grain-brown-100"
                        >
                          Nueva Publicacion
                        </a>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <a
                          href="/publications"
                          className="block px-3 py-2 text-base text-gray-700 rounded-md hover:bg-grain-brown-100"
                        >
                          Listar
                        </a>
                      </SidebarMenuItem>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Footer />
    </Sidebar>
  );
}
