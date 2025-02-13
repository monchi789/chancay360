import Image from "next/image";
import Button from "./Button";

export default function FeaturedProjects() {
  const projects = [
    {
      title: "Zona de Desarrollo Logístico",
      description:
        "Ubicación estratégica cerca del puerto, ideal para centros de distribución y comercio.",
      image: "/images/proyecto1.webp",
      link: "#",
      buttonText: "Explorar",
    },
    {
      title: "Proyectos Turísticos en la Costa",
      description:
        "Oportunidades en hoteles y desarrollos turísticos en Chancay.",
      image: "/images/proyecto1.webp",
      link: "#",
      buttonText: "Ver Más",
    },
  ];

  return (
    <section className="py-20 bg-[#F4F3EE]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Título */}
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Proyectos Destacados
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-3xl shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative w-full h-[450px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  priority={index === 0}
                  className="rounded-3xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8 flex flex-col justify-end">
                <h3 className="text-3xl font-extrabold text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-white mt-4 text-lg">{project.description}</p>
                <div className="mt-8">
                 <Button text={project.buttonText} href={project.link}/> 
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
