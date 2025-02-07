"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Iconos para menú móvil

const NAV_LINKS = [
  { name: "Inicio", href: "/" },
  { name: "Inversiones", href: "/inversiones" },
  { name: "Noticias y recursos", href: "/noticias" },
  { name: "Gestión de proyectos", href: "/proyectos" },
  { name: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.7);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-20 transition-all duration-300 z-50 flex items-center px-4 sm:px-10
        ${isScrolled ? "bg-white shadow-md" : "bg-white/10 backdrop-blur-md"}
      `}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO DINÁMICO */}
        <Link href="/" className="flex items-center">
          <Image
            src={isScrolled ? "/images/logo.svg" : "/images/logo-white.svg"}
            alt="Chancay 360"
            width={150}
            height={50}
            priority
          />
        </Link>

        {/* MENÚ DESKTOP */}
        <div className="hidden md:flex space-x-6 lg:space-x-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-lg font-medium transition ${
                isScrolled ? "text-gray-900 hover:text-blue-600" : "text-white hover:text-gray-200"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* BOTÓN DE MENÚ MÓVIL */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden transition ${isScrolled ? "text-gray-900" : "text-white"}`}
          aria-label="Abrir menú"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MENÚ MÓVIL */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="absolute top-0 left-0 w-3/4 max-w-sm h-full bg-white shadow-lg py-6 px-6 flex flex-col">
          <button onClick={() => setIsOpen(false)} className="self-end text-gray-800">
            <X size={28} />
          </button>
          <ul className="mt-6 space-y-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-gray-900 hover:text-blue-600 transition text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
