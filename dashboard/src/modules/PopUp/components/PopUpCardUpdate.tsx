import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { updatePopUp, getPopUpById } from "@/modules/PopUp/services/PopUp.api";
import { usePopUps } from "@/modules/PopUp/hooks/usePopUp";
import ImageUploader from "@/shared/common/ImageUpload";

const API_URL = import.meta.env.VITE_URL;

interface PopUpEditProps {
  idPopUp: number;
  onClose: () => void;
}

const PopUpCardUpdate: React.FC<PopUpEditProps> = ({ idPopUp, onClose }) => {
  const { refetch } = usePopUps();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPopUpData = async () => {
      try {
        const popUp = await getPopUpById(idPopUp.toString());

        if (popUp.images && popUp.images.length > 0) {
          const imageUrls = popUp.images.map((image: string) =>
            image.startsWith("http") ? image : `${API_URL}${image}`
          );
          setPreviews(imageUrls);
        }
      } catch {
        setErrorMessage("Error al cargar datos del pop-up");
      } finally {
        setIsLoading(false);
      }
    };

    loadPopUpData();
  }, [idPopUp]);

  const handleDrop = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    if (previews[index].startsWith("blob:")) {
      setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    }
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("loading");

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    const existingImages = previews
      .filter((preview) => !preview.startsWith("blob:"))
      .map((preview) => preview.replace(API_URL, ""));

    existingImages.forEach((image) => {
      formData.append("images", image);
    });

    console.log("FormData content:");
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      await updatePopUp(idPopUp, formData);
      await refetch();
      setStatus("success");
      onClose();
    } catch {
      setErrorMessage("Error al actualizar el pop-up");
      setStatus("error");
    }
  };

  if (isLoading) {
    return <div className="p-6">Cargando datos del pop-up...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Editar PopUp</h2>

      {status === "success" && (
        <p className="text-green-600 bg-green-100 p-2 rounded-lg">PopUp actualizado con éxito.</p>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">{errorMessage}</div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">Imágenes</label>
          <ImageUploader previews={previews} onDrop={handleDrop} removeImage={removeImage} />
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
          disabled={status === "loading"}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4 inline-block mr-1" />
          {status === "loading" ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default PopUpCardUpdate;
