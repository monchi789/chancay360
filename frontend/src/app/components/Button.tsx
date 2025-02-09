import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  text: string;
  href: string;
  variant?: "primary" | "secondary"; 
  size?: "sm" | "md" | "lg"; 
  icon?: boolean; 
  className?: string; 
}

export default function Button({
  text,
  href,
  variant = "primary",
  size = "md",
  icon = true,
  className = "",
}: ButtonProps) {
  // Clases base para todos los botones
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-full transition-all shadow-md";

  // Variantes de color
  const variantClasses = {
    primary: "bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold border border-red-700 shadow-lg hover:bg-red-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ",
    secondary: "bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold border border-red-600 shadow-lg hover:bg-red-100 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300",
  };

  // Tamaños de botón
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {text}
      {icon && <ArrowUpRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />}
    </Link>
  );
}
