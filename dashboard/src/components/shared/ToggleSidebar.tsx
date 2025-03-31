import { useSidebar } from "@/components/ui/sidebar"
import { Home } from "lucide-react"

export function ToggleSidebar() {
  const { toggleSidebar } = useSidebar()
  return (
    <button onClick={toggleSidebar}   >
      <Home />
    </button>
  );
}
