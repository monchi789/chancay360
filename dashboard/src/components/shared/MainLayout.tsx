import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./Sidebar"
import { Toaster } from "@/components/ui/sonner"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full overflow-x-hidden">
        <SidebarTrigger className="mt-2"/>
        {children}
        <Toaster richColors  />
      </main>
    </SidebarProvider>
  )
}
