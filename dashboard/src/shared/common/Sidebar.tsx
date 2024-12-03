import { useState } from "react";
import {
  Users,
  Home,
  BookUser,
  Library,
  StickyNote,
  PictureInPicture2,
  LayoutDashboard,
  Images,
} from "lucide-react";
import logoWhite from "@/assets/images/logo-white.svg";

const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Usuarios",
    url: "#",
    icon: Users,
  },
  {
    title: "Clientes",
    url: "/cliente",
    icon: BookUser,
  },
  {
    title: "Publicaciones",
    url: "#",
    icon: StickyNote,
  },
  {
    title: "Pop Up",
    url: "#",
    icon: PictureInPicture2,
  },
  {
    title: "Galeria",
    url: "#",
    icon: Images,
  },
  {
    title: "Tipo General",
    url: "/tipo-general",
    icon: Library,
  },
];

const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative">
      <div
        className={`h-screen bg-ceruleanBlue-700 ${
          isCollapsed ? "w-14" : "w-64"
        } transition-all duration-500 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center p-6">
            <img src={logoWhite} alt="Logo de Chancay360" className="h-12" />
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-1">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.url}
                    className="flex items-center px-4 py-3 text-yellow-50 hover:bg-yellowOrange-400 rounded-md transition-colors duration-150"
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && (
                      <span className="ml-2 text-sm">{item.title}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Collapse Button */}
      <a
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-10 -right-4 transform bg-mediumPurple-700 text-white rounded-lg p-1 hover:bg-mediumPurple-800 transition-transform duration-500 shadow-lg ${
          isCollapsed ? "rotate-180" : ""
        }`}
      >
        <LayoutDashboard />
      </a>
    </div>
  );
};

export default AppSidebar;
