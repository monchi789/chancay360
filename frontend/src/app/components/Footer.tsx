import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#E3D5C0] text-gray-900 py-14 px-6 sm:px-16 rounded-t-[50px]">
      <div className="max-w-6xl mx-auto">
        {/* Contenedor principal con 4 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 border-b border-gray-400 pb-8">
          {/* Logo */}
          <div className="flex flex-col items-center sm:items-start">
            <Image src="/images/logoFooter.png" alt="Chancay 360" width={140} height={50} />
          </div>

          {/* Contacto */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg mb-4">Conéctate con Nosotros</h3>
            <p className="text-base font-semibold">Correo</p>
            <p className="text-base text-gray-700">info@chancay360.com</p>
            <p className="text-base font-semibold mt-3">Teléfono</p>
            <p className="text-base text-gray-700">+51 999 888 777</p>
          </div>

          {/* Sobre Nosotros */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg mb-4">Sobre Nosotros</h3>
            <ul className="space-y-2 text-base text-gray-700">
              <li><a href="#" className="hover:text-red-600 transition">Acerca de Chancay 360</a></li>
              <li><a href="#" className="hover:text-red-600 transition">Proyectos Estratégicos</a></li>
              <li><a href="#" className="hover:text-red-600 transition">Noticias y Recursos</a></li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg mb-4">Síguenos</h3>
            <div className="flex flex-col gap-2 text-base">
              <a href="#" className="flex items-center gap-3 hover:text-red-600 transition">
                <Twitter className="h-5 w-5 text-gray-800" />
                Twitter
              </a>
              <a href="#" className="flex items-center gap-3 hover:text-red-600 transition">
                <Instagram className="h-5 w-5 text-gray-800" />
                Instagram
              </a>
              <a href="#" className="flex items-center gap-3 hover:text-red-600 transition">
                <Facebook className="h-5 w-5 text-gray-800" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Footer Legal */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-700">
          <p>© 2025 Chancay360. Todos los derechos reservados</p>
          <div className="flex space-x-4 mt-3 sm:mt-0">
            <a href="#" className="hover:text-red-600 transition">Aviso legal</a>
            <span>|</span>
            <a href="#" className="hover:text-red-600 transition">Política de Privacidad</a>
            <span>|</span>
            <a href="#" className="hover:text-red-600 transition">Política de cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
