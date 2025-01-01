import { useState, useEffect } from "react";

import {
  Users,
  Home,
  BookUser,
  Library,
  StickyNote,
  PictureInPicture2,
  LayoutDashboard,
  Images,
  LogOut
} from "lucide-react";
import logoWhite from "@/assets/images/logo-white.svg";
import { SidebarFooter } from "@/shared/components/ui/sidebar.tsx";
import { useNavigate, Link } from "react-router-dom"; // Importar Link


const items = [
  { title: "Inicio", url: "/", icon: Home },
  { title: "Usuarios", url: "/usuario", icon: Users },
  { title: "Clientes", url: "/cliente", icon: BookUser },
  { title: "Publicaciones", url: "/publicacion", icon: StickyNote },
  { title: "Pop Up", url: "/popup", icon: PictureInPicture2 },
  { title: "Galeria", url: "/galeria", icon: Images },
  { title: "Tipo General", url: "/tipo-general", icon: Library },
];

const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem("sidebar-collapsed") === "true"
  );
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  const easing = "ease-[cubic-bezier(.4,0,.2,1)]";

  const handleLogout = () => {
    localStorage.clear();

    navigate('/login')
  }

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    localStorage.setItem("sidebar-collapsed", newCollapsedState.toString()); 
  };

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640); 
    };

    updateScreenSize(); 
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setIsCollapsed(true);
    }
  }, [isSmallScreen]);

  return (
    <div className="relative">
      <div

        className={`h-screen bg-ceruleanBlue-700 shadow-lg transition-[width,opacity] duration-500 ${easing} ${
          isCollapsed ? "w-16 opacity-90" : "w-64 opacity-100"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center p-4 sm:p-6 border-ceruleanBlue-500">
            <img
              src={logoWhite}
              alt="Logo de Chancay360"
              className={`h-2 sm:h-12 ${isCollapsed ? "hidden" : "block"}`}
            />
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 mt-4">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.url} 
                    className={`flex items-center px-3 py-3 text-yellow-50 hover:bg-yellowOrange-400 rounded-lg transition-all duration-200 ${easing} ${
                      isCollapsed ? "justify-center" : "justify-start"
                    }`}
                  >
                    <item.icon className="h-7 w-7" />
                    {!isCollapsed && (
                      <span className="ml-3 text-base truncate font-medium transition-opacity duration-300">
                        {item.title}
                      </span>
                    )}
                  </Link>

                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <SidebarFooter className="mt-auto mb-4">
            <a
              onClick={handleLogout}
              className={`flex items-center px-3 py-3 text-yellow-50 hover:bg-yellowOrange-400 rounded-lg transition-all duration-200 cursor-pointer ${
                isCollapsed ? "justify-center" : "justify-start"
              }`}
            >
              <LogOut className="h-5 w-5" />
              {!isCollapsed && (
                <span className="ml-3 text-l font-medium transition-opacity duration-300">
                  Salir
                </span>
              )}

            </a>
          </SidebarFooter>
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={toggleCollapse}
        className={`absolute top-5 -right-5 bg-mediumPurple-700 text-white rounded-full p-2 shadow-lg hover:bg-mediumPurple-800 transition-transform duration-300 ${easing} ${
          isCollapsed ? "rotate-180" : "rotate-0"
        }`}
      >
        <LayoutDashboard className="h-7 w-7" />
      </button>

    </div>
  );
};

export default AppSidebar;
