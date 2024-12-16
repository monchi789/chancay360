import React, { useState } from "react";
import { Save } from "lucide-react";
import { createPublication } from "../services/Publication.api";
import { usePublications } from "@/modules/publication/hooks/usePublicationTypes";
import ImageUploader from "@/shared/common/ImageUpload.tsx";

interface GalleryCreateProps {
  onClose: () => void;
}

const GalleryCardCreate: React.FC<GalleryCreateProps> = ({ onClose }) => {
  const { refetch } = usePublications();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [publicationDate, setPublicationDate] = useState<Date>(new Date());
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Manejo de imágenes
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

  // Submit del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir comportamiento por defecto
    setStatus("loading");
    setErrorMessage(null);
  
    // Validar que description tenga al menos 3 caracteres
    if (!description || description.trim().length < 3) {
      setErrorMessage("La descripción debe tener al menos 3 caracteres.");
      setStatus("error");
      return;
    }
  
    try {
      // Crear el FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("category", category);
      formData.append("content", description); // Asignar description a content
  
      selectedFiles.forEach((file) => {
        formData.append("cover", file);
      });
  
      // Llamar a la API
      await createPublication(formData);
  
      setStatus("success");
      await refetch(); // Refrescar la lista de publicaciones
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      setErrorMessage("Error al crear la publicación.");
      setStatus("error");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Crear Nueva Publicación
      </h2>

      {/* Mensajes de éxito o error */}
      {status === "success" && (
        <p className="text-green-600 bg-green-100 p-2 rounded-lg">
          Publicación creada con éxito.
        </p>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Campos del formulario */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full mt-2 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Autor <span className="text-red-500">*</span>
          </label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="block w-full mt-2 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Categoría <span className="text-red-500">*</span>
          </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full mt-2 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Fecha de Publicación <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={publicationDate.toISOString().substring(0, 10)}
            onChange={(e) => setPublicationDate(new Date(e.target.value))}
            className="block w-full mt-2 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Subida de imágenes */}
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

        {/* Descripción */}
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

      {/* Botones de acción */}
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
          <Save className="w-4 h-4 inline-block mr-1" /> Guardar
        </button>
      </div>
    </form>
  );
};

export default GalleryCardCreate;
