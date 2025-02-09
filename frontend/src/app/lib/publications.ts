import axiosInstance from "@/app/config/axios";
import { Publication } from "@/app/interfaces/Publication";

/**
 * Obtener todas las publicaciones.
 * @returns {Promise<Publication[]>} Lista de publicaciones o un array vacío si falla.
 */
export const getAllPublications = async (): Promise<Publication[]> => {
  const res = await axiosInstance.get("publication");
  return res.data;
};

/**
 * Obtener una publicación por ID.
 * @param idPublication - ID de la publicación a buscar.
 * @returns {Promise<Publication | null>} Publicación encontrada o `null` si falla.
 */
export const getPublicationById = async (
  idPublication: string
): Promise<Publication> => {
  try {
    const res = await axiosInstance.get(`publication/${idPublication}`);
    return res.data;
  } catch {
    throw new Error("Error al obtener la publicación por ID");
  }
};
