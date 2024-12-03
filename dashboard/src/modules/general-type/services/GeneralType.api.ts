import { GeneralType } from "@/interfaces/GeneralType";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getAllGeneralTypes = async (): Promise<GeneralType[]> => {
  const res = await axiosInstance.get("general-type");
  return res.data;
};

export const getGeneralTypeById = async (
  idGeneralType: string
): Promise<GeneralType> => {
  try {
    const res = await axiosInstance.get(`general-type/${idGeneralType}`);
    return res.data;
  } catch (error) {
    console.error("Error en getGeneralTypeById:", error);
    throw new Error("Error al obtener el tipo general");
  }
};

export const updateGeneralType = async (
  idGeneralType: string,
  generalType: Partial<GeneralType>
): Promise<GeneralType> => {
  try {
    const res = await axiosInstance.patch(
      `general-type/${idGeneralType}`,
      generalType
    );
    return res.data;
  } catch (error) {
    console.error("Error en updateGeneralType:", error);
    throw new Error("Error al actualizar el tipo general");
  }
};

export const createGeneralType = async (
  generalType: Omit<GeneralType, "idGeneralType">
): Promise<GeneralType> => {
  try {
    const res = await axiosInstance.post("general-type", generalType);
    return res.data;
  } catch (error) {
    console.error("Error al crear el tipo general:", error);
    throw new Error("Error al crear el tipo general");
  }
};

export const deleteGeneralType = async (
  idGeneralType: string
): Promise<void> => {
  try {
    await axiosInstance.delete(`general-type/${idGeneralType}`);
  } catch (error) {
    console.error("Error al eliminar el tipo general:", error);
    throw new Error("Error al eliminar el tipo general");
  }
};
