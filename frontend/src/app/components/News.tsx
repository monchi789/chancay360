"use client";

import { usePublications } from "@/app/Hooks/usePublicationTypes";
import Image from "next/image";
import Button from "./Button";

export default function News() {
  const { data: publications, isError, error } = usePublications();
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ;

  if (isError) {
    return (
      <div className="text-center text-red-500 font-semibold">
        Error: {error instanceof Error ? error.message : "No se pudieron cargar las noticias."}
      </div>
    );
  }

  if (!publications?.length) {
    return (
      <div className="text-center text-gray-500 font-semibold">
        No hay noticias disponibles.
      </div>
    );
  }

  return (
    <section className="py-20 bg-[#F4F3EE]">
      <div className="max-w-7xl mx-auto px-8">
        {/* Título */}
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Noticias</h2>

        {/* Primera noticia destacada */}
        <div className="relative bg-[#1B2D56] text-white rounded-3xl p-4 md:p-10 flex flex-col md:flex-row shadow-lg mb-10">
          {/* Imagen destacada */}
          <div className="relative w-full md:w-2/3 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={
                publications[0]?.cover?.[0]?.startsWith("/uploads/")
                  ? `${imageBaseUrl}${publications[0].cover[0]}`
                  : "/fallback-image.jpg"
              }
              alt="Imagen Destacada"
              width={800}
              height={450}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>

          {/* Contenido */}
          <div className="md:w-1/2 p-4 flex flex-col justify-between">
            <h3 className="text-3xl font-bold">{publications[0].title}</h3>
            <p className="text-lg mt-4 text-gray-200 leading-relaxed line-clamp-4">
              {publications[0].content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 200)}...
            </p>
            <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
              <span>Noticias • {new Date(publications[0].publicationDate).toLocaleDateString()}</span>
              <Button text="Ver más" href={`/noticia/${publications[0].idPublication}`} variant="secondary" />
            </div>
          </div>
        </div>

        {/* Grid de noticias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publications.slice(1, 4).map((publication) => {
            const coverPath = publication.cover?.[0]?.startsWith("/uploads/")
              ? `${imageBaseUrl}${publication.cover[0]}`
              : "/fallback-image.jpg";

            return (
              <div key={publication.idPublication} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="w-full aspect-video bg-gray-100">
                  <Image
                    src={coverPath}
                    alt="Imagen Noticia"
                    width={400}
                    height={250}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800">{publication.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {publication.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 120)}...
                  </p>
                  <div className="mt-4 flex justify-between items-center text-sm ">
                    <span className="text-orange-300">Noticias • {new Date(publication.publicationDate).toLocaleDateString()}</span>
                    <Button text="Leer más" href={`/noticia/${publication.idPublication}`} variant="secondary"  />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
