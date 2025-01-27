import React, { useState } from "react";
import { Save } from "lucide-react";
import { createPopUp } from "../services/PopUp.api";
import { usePopUps } from "@/modules/PopUp/hooks/usePopUp";
import ImageUploader from "@/shared/common/ImageUpload";
import { PopUp } from "@/interfaces/PopUp";

interface PopUpCreateProps {
  onClose: () => void;
}

const PopUpCardCreate: React.FC<PopUpCreateProps> = ({ onClose }) => {
  const { refetch } = usePopUps();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

  const handleDrop = (files: File[]) => {
    setErrorMessage(null);
    const validFiles = files.filter(
      (file) => allowedTypes.includes(file.type) && file.size <= MAX_FILE_SIZE
    );

    if (validFiles.length !== files.length) {
      setErrorMessage("Algunas imágenes no son válidas (formato o tamaño). Máx: 5MB");
      return;
    }

    setSelectedFiles((prev) => [...prev, ...validFiles]);
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("loading");

    if (selectedFiles.length === 0) {
      setErrorMessage("Por favor, selecciona al menos una imagen");
      setStatus("error");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

    try {
      const response: PopUp = await createPopUp(formData);
      if (!response.idPopUp) {
        throw new Error("No se pudo crear el PopUp");
      }

      await refetch();
      setStatus("success");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error al crear el PopUp:", error.message);
        setErrorMessage(error.message || "Error al crear el PopUp. Intenta nuevamente.");
      } else {
        console.error("Error desconocido al crear el PopUp:", error);
        setErrorMessage("Error desconocido al crear el PopUp. Intenta nuevamente.");
      }
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Crear Nuevo PopUp</h2>

      {status === "success" && (
        <p className="text-green-600 bg-green-100 p-2 rounded-lg">PopUp creado con éxito.</p>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Imágenes</label>
          <ImageUploader
            previews={previews}
            onDrop={handleDrop}
            removeImage={removeImage}
            validationError={selectedFiles.length === 0 ? errorMessage : undefined}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={status === "loading" || selectedFiles.length === 0}
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 ${
            status === "loading" ? "cursor-not-allowed" : ""
          }`}
        >
          <Save className="w-4 h-4 inline-block mr-1" />
          {status === "loading" ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default PopUpCardCreate;
