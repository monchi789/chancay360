import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#E3D5C0] text-gray-900 py-20 px-6 sm:px-16 rounded-t-[60px]">
      <div className="max-w-7xl mx-auto">
        {/* Contenedor principal con columnas y separadores */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 border-b border-gray-400 pb-12">
          {/* Logo */}
          <div className="flex flex-col items-center sm:items-start">
            <Image src="/images/logoFooter.png" alt="Chancay 360" width={180} height={70} />
          </div>

          {/* Contacto */}
          <div className="relative text-center sm:text-left">
            <h3 className="font-extrabold text-xl mb-5">Conéctate con Nosotros</h3>
            <p className="text-lg font-semibold">Correo de Contacto</p>
            <p className="text-lg text-gray-700">info@chancay360.com</p>
            <p className="text-lg font-semibold mt-4">Teléfono</p>
            <p className="text-lg text-gray-700">+51 999 888 777</p>
          </div>

          {/* Sobre Nosotros */}
          <div className="relative text-center sm:text-left">
            <h3 className="font-extrabold text-xl mb-5">Sobre Nosotros</h3>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>📌 Acerca de Chancay 360.</li>
              <li>📍 Proyectos Estratégicos.</li>
              <li>📢 Noticias y Recursos.</li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="relative text-center sm:text-left">
            <h3 className="font-extrabold text-xl mb-5">Redes Sociales</h3>
            <div className="flex flex-col gap-4 text-lg">
              <a href="#" className="flex items-center gap-3 hover:text-red-600 transition hover:scale-105">
                <Twitter className="h-6 w-6 text-gray-800" />
                Twitter
              </a>
              <a href="#" className="flex items-center gap-3 hover:text-red-600 transition hover:scale-105">
                <Instagram className="h-6 w-6 text-gray-800" />
                Instagram
              </a>
              <a href="#" className="flex items-center gap-3 hover:text-red-600 transition hover:scale-105">
                <Facebook className="h-6 w-6 text-gray-800" />
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Footer Legal */}
        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center text-lg text-gray-700">
          <p>© 2025 Chancay360. Todos los derechos reservados</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-red-600 transition hover:underline">Aviso legal</a>
            <span>|</span>
            <a href="#" className="hover:text-red-600 transition hover:underline">Política de Privacidad</a>
            <span>|</span>
            <a href="#" className="hover:text-red-600 transition hover:underline">Política de cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
