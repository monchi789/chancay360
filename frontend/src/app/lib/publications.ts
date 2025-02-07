import axiosInstance from "@/app/config/axios";
import { Publication } from "@/app/interfaces/Publication";

// Obtener todas las publicaciones
export const getAllPublications = async (): Promise<Publication[]> => {
  const res = await axiosInstance.get("publication");
  return res.data;
};

// Obtener una publicación por ID
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
