import axiosInstance from "@/config/axios";
import { PopUp } from "@/interfaces/PopUp";

export const getAllPopUps = async (): Promise<PopUp[]> => {
  const res = await axiosInstance.get("pop-up");
  return res.data;
};

export const getPopUpById = async (idPopUp: string): Promise<PopUp> => {
  try {
    const res = await axiosInstance.get(`pop-up/${idPopUp}`);
    return res.data;
  } catch {
    throw new Error("Error to get pop-up by ID");
  }
};

export const updatePopUp = async (
  idPopUp: number,
  formData: FormData
): Promise<PopUp> => {
  try {
    const res = await axiosInstance.patch(`pop-up/${idPopUp}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch {
    throw new Error('Error updating pop-up');
  }
};

export const createPopUp = async (formData: FormData): Promise<PopUp> => {
  try {
    const res = await axiosInstance.post("pop-up", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch {
    throw new Error("Error creating new pop-up");
  }
};

export const deletePopUp = async (idPopUp: number): Promise<PopUp> => {
  try {
    const res = await axiosInstance.delete(`pop-up/${idPopUp}`);
    return res.data;
  } catch {
    throw new Error('Error deleting pop-up');
  }
};
