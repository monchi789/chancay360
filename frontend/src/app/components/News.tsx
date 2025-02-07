"use client";

import { usePublications } from "@/app/Hooks/usePublicationTypes";
import Image from "next/image";

export default function News() {
  const { data: publications, isError, error } = usePublications();
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:8000"; 
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

  console.log("Publicaciones:", publications);

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 text-left mb-8">Últimas Noticias</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {publications.map((publication) => {
          // Construcción segura del coverPath
          const coverPath = publication.cover?.[0]?.startsWith("/uploads/")
            ? `${imageBaseUrl}${publication.cover[0]}` 
            : "/fallback-image.jpg";
          return (
            <div key={publication.idPublication} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="w-full aspect-video bg-gray-100">
                <Image
                  src={coverPath}
                  alt="Imagen Cover"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>

              {/* Contenido */}
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-1">
                  {new Date(publication.publicationDate).toLocaleDateString()}
                </p>
                <h3 className="text-lg font-semibold text-gray-800">{publication.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {publication.content.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 120)}...
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
