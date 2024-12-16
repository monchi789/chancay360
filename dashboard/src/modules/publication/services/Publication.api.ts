import axiosInstance from "@/config/axios";
import { Publication } from "@/interfaces/Publication";

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

// Actualizar una publicación usando FormData
export const updatePublication = async (
  idPublication: string,
  formData: FormData
): Promise<Publication> => {
  try {
    const res = await axiosInstance.patch(
      `publication/${idPublication}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch {
    throw new Error("Error al actualizar la publicación");
  }
};

// Crear una publicación usando FormData
export const createPublication = async (
  formData: FormData
): Promise<Publication> => {
  try {
    const res = await axiosInstance.post("publication", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch {
    throw new Error("Error al crear la publicación");
  }
};

// Eliminar una publicación
export const deletePublication = async (
  idPublication: string
): Promise<void> => {
  try {
    await axiosInstance.delete(`publication/${idPublication}`);
  } catch {
    throw new Error("Error al eliminar la publicación");
  }
};
