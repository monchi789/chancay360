import React, {useState, useEffect} from "react";
import {Save} from "lucide-react";
import {updateGallery, getGalleryById} from "@/modules/gallery/services/Gallery.api";
import {useGallery} from "@/modules/gallery/hooks/useGallery";
import ImageUploader from "@/shared/common/ImageUpload";

const API_URL = import.meta.env.VITE_URL;

interface GalleryEditProps {
  idGallery: number;
  onClose: () => void;
}

const GalleryCardUpdate: React.FC<GalleryEditProps> = ({idGallery, onClose}) => {
  const {refetch} = useGallery();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGalleryData = async () => {
      try {
        const gallery = await getGalleryById(idGallery.toString());
        setDescription(gallery.description || "");

        if (gallery.images && gallery.images.length > 0) {
          const imageUrls = gallery.images.map((image) =>
            image.startsWith("http") ? image : `${API_URL}${image}`
          );
          setPreviews(imageUrls);
        }
      } catch {
        setErrorMessage("Error to load data gallery");
      } finally {
        setIsLoading(false);
      }
    };

    loadGalleryData();
  }, [idGallery]);

  const handleDrop = (files: File[]) => {
    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });

    setPreviews((prev) => {
      const updatedPreviews = [...prev];
      const removedPreview = updatedPreviews[index];
      
      if (removedPreview.startsWith('blob:')) {
        URL.revokeObjectURL(removedPreview);
      }

      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("loading");

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    const updateDto = {
      description: description.trim(),
      existingImages: previews
        .filter(preview => !preview.startsWith("blob:"))
        .map(preview => preview.replace(API_URL, ""))
    };

    formData.append("data", JSON.stringify(updateDto));

    try {
      await updateGallery(idGallery, formData);
      await refetch();
      setStatus("success");
      onClose();
    } catch {
      setErrorMessage("Error al actualizar la galería");
      setStatus("error");
    }
  };

  if (isLoading) {
    return <div className="p-6">Cargando datos de la galería...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Editar Galería</h2>

      {status === "success" && (
        <p className="text-green-600 bg-green-100 p-2 rounded-lg">
          Galería actualizada con éxito.
        </p>
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
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">Descripción</label>
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
          <Save className="w-4 h-4 inline-block mr-1"/>
          {status === "loading" ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default GalleryCardUpdate;
