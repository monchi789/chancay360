import axiosIntance from "@/config/axios";

// Get all general types
export const getAllGeneralTypes = async () => {
  const res = await axiosIntance.get("general-type");
  return res.data;
};

// Get a general type by id
export const getGeneralTypeById = async (id: string) => {
  try {
    const res = await axiosIntance.get(`general-type/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error("Error al obtener el tipo general");
    }
    throw error;
  }
};

// Pach a general type
export const updateGeneralType = async (id: string, generalType: {
  code: string;
  name: string;
  description?: string;
  type: string;
  active: boolean;
}) => {
  try {
    const res = await axiosIntance.patch(`general-type/${id}`, generalType);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error("Error al actualizar el tipo general");
    }
    throw error;
  }
};

// Create a general type
export const createGeneralType = async (generalType: {
  code: string;
  name: string;
  description?: string;
  type: string;
  active: boolean;
}) => {
  try {
    const res = await axiosIntance.post("general-type", generalType);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error("Error al crear el tipo general");
    }
    throw error;
  }
};

// Delete a general type
export const deleteGeneralType = async (id: string) => {
  try {
    const res = await axiosIntance.delete(`general-type/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      throw new Error("Error al eliminar el tipo general");
    }
    throw error;
  }
};
