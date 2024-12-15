import React, {useState} from "react";
import {Save} from "lucide-react";
import {createGallery} from "../services/Gallery.api";
import {useGallery} from "@/modules/gallery/hooks/useGallery.ts";
import ImageUploader from "@/shared/common/ImageUpload.tsx";

interface GalleryCreateProps {
  onClose: () => void;
}

const GalleryCardCreate: React.FC<GalleryCreateProps> = ({onClose}) => {
  const {refetch} = useGallery();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDrop = (files: File[]) => {
    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
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

    if (description) {
      formData.append("description", description);
    }

    try {
      await createGallery(formData); 
      await refetch(); 
      setStatus("success");
      onClose(); 
    } catch (error) {
      console.error("Error al crear la galería:", error);
      setErrorMessage("Error al crear la galería");
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Crear Nueva Galería
      </h2>

      {status === "success" && (
        <p className="text-green-600 bg-green-100 p-2 rounded-lg">
          Galería creada con éxito.
        </p>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Imágenes
          </label>
          <ImageUploader
            previews={previews}
            onDrop={handleDrop}
            removeImage={removeImage}
            validationError={selectedFiles.length === 0 ? errorMessage : undefined}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Descripción (opcional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full mt-2 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            rows={3}
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
          disabled={status === "loading"}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4 inline-block mr-1"/> Guardar
        </button>
      </div>
    </form>
  );
};

export default GalleryCardCreate;
