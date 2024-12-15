import { Publication } from "@/interfaces/Publication";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAllPublications = async (): Promise<Publication[]> => {
  const res = await axiosInstance.get("publication");
  return res.data;
};

export const getPublicationById = async (
  idPublication: string
): Promise<Publication> => {
  try {
    const res = await axiosInstance.get(`publication/${idPublication}`);
    return res.data;
  } catch (error) {
    console.error("Error en getPublicationById:", error);
    throw new Error("Error al obtener la publicación");
  }
};

export const updatePublication = async (
  idPublication: string,
  publication: Partial<Publication>
): Promise<Publication> => {
  try {
    const res = await axiosInstance.patch(
      `publication/${idPublication}`,
      publication
    );
    return res.data;
  } catch (error) {
    console.error("Error en updatePublication:", error);
    throw new Error("Error al actualizar la publicación");
  }
};

export const createPublication = async (
  publication: Omit<Publication, "idPublication">
): Promise<Publication> => {
  try {
    const res = await axiosInstance.post("publication", publication);
    return res.data;
  } catch (error) {
    console.error("Error al crear la publicación:", error);
    throw new Error("Error al crear la publicación");
  }
};

export const deletePublication = async (
  idPublication: string
): Promise<void> => {
  try {
    await axiosInstance.delete(`publication/${idPublication}`);
  } catch (error) {
    console.error("Error al eliminar la publicación:", error);
    throw new Error("Error al eliminar la publicación");
  }
};
