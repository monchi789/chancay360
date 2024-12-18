import axiosInstance from "@/config/axios";
import {Gallery} from "@/interfaces/Gallery.ts";

export const getAllGalleries = async (): Promise<Gallery[]> => {
  const res = await axiosInstance.get("gallery");
  return res.data;
}

export const getGalleryById = async (idGallery: string): Promise<Gallery> => {
  try {
    const res = await axiosInstance.get(`gallery/${idGallery}`);
    return res.data;
  } catch {
    throw new Error("Error to get gallery by ID");
  }
};

export const updateGallery = async (
  idGallery: number,
  formData: FormData
): Promise<Gallery> => {
  try {
    const res = await axiosInstance.patch(`gallery/${idGallery}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch {
    throw new Error('Error al actualizar la galería');
  }

}


export const createGallery = async (formData: FormData): Promise<Gallery> => {
  try {
    const res = await axiosInstance.post("gallery", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch {
    throw new Error("Error to create new gallery");
  }
};

export const deleteGallery = async (idGallery: number): Promise<Gallery> => {
  try {
    const res = await axiosInstance.delete(`gallery/${idGallery}`);
    return res.data;
  } catch {
    throw new Error('Error to delete Gallery')
  }
}
