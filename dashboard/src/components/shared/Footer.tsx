import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronUp, User2 } from "lucide-react";

export function Footer() {
  return (
    <SidebarFooter className="bg-grain-brown-50 rounded-t-2xl hover:bg-grain-brown-100">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              asChild
              className="hover:bg-grain-brown-100"
            >
              <SidebarMenuButton className="font-semibold border-none">
                <User2 /> Usuario
                <ChevronUp className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="min-w-60 !bg-grain-brown-50"
            >
              <DropdownMenuItem className="!bg-grain-brown-50 hover:!bg-grain-brown-100">
                <span>Informacion</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="!bg-grain-brown-50 hover:!bg-grain-brown-100">
                <span>Configuracion</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="bg-bright-red-600 text-white font-semibold hover:!bg-red-700 hover:!text-white">
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
