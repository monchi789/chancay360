import axios from "axios";
import {Gallery} from "@/interfaces/Gallery.ts";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const getAllGalleries = async (): Promise<Gallery[]> => {
  const res = await axiosInstance.get("gallery");
  return  res.data;
}

export const getGalleryById = async (idGallery: string): Promise<Gallery> => {
  try {
    const res = await axiosInstance.get(`gallery/${idGallery}`);
    return res.data;
  } catch (error) {
    console.error("Error en getGalleryById:", error);
    throw new Error("Error al obtener la galeria");
  }
};

export const updateGallery = async (
  idGallery: string,
  gallery: Partial<Gallery>
): Promise<Gallery> => {
  try {
    const res = await axiosInstance.patch(`gallery/${idGallery}`, gallery);
    return res.data;
  } catch (error) {
    console.error("Error en updateGallery:", error);
    throw new Error("Error al actualizar la galeria");
  }
};

export const createGallery = async (
  gallery: Omit<Gallery, "idGallery">
): Promise<Gallery> => {
  try {
    const res = await axiosInstance.post("gallery", gallery);
    return res.data;
  } catch (error) {
    console.error("Error al crear la galeria:", error);
    throw new Error("Error al crear la galeria");
  }
};
