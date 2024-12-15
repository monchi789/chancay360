import {GeneralType} from "@/interfaces/GeneralType";
import axiosInstance from "@/config/axios.ts";

export const getAllGeneralTypes = async (): Promise<GeneralType[]> => {
  try {
    const res = await axiosInstance.get("general-type");
    return res.data;
  } catch {
    throw new Error('Failed to get all general type')
  }
};

export const getGeneralTypeById = async (
  idGeneralType: string
): Promise<GeneralType> => {
  try {
    const res = await axiosInstance.get(`general-type/${idGeneralType}`);
    return res.data;
  } catch {
    throw new Error("Error on get the general type by ID");
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
  } catch {
    throw new Error("Error on update the general type");
  }
};

export const createGeneralType = async (
  generalType: Omit<GeneralType, "idGeneralType">
): Promise<GeneralType> => {
  try {
    const res = await axiosInstance.post("general-type", generalType);
    return res.data;
  } catch {
    throw new Error("Error on create the general type");
  }
};

export const deleteGeneralType = async (
  idGeneralType: string
): Promise<void> => {
  try {
    await axiosInstance.delete(`general-type/${idGeneralType}`);
  } catch {
    throw new Error("Error on delete general type");
  }
};
