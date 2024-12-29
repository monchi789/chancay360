import React, { useState } from "react";
import { Save } from "lucide-react";
import { createPublication } from "../services/Publication.api";
import { usePublications } from "@/modules/publication/hooks/usePublicationTypes";
import { useToast } from "@/shared/common/Toast"; // Importa el hook de Toast
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "@/shared/common/ImageUpload";
import PDFUploader from "@/shared/common/PdfUpload";
import Title from "@/shared/common/Title.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

const PublicationCreate: React.FC = () => {
  const { refetch } = usePublications();
  const { showToast } = useToast(); // Obtén la función para mostrar toasts
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedPDFs, setSelectedPDFs] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [pdfPreviews, setPdfPreviews] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const categories = ["Noticias", "Artículos", "Tutoriales", "Eventos"];

  const handleImageDrop = (files: File[]) => {
    const newFiles = [...selectedFiles, ...files];
    setSelectedFiles(newFiles);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handlePDFDrop = (files: File[]) => {
    if (selectedPDFs.length + files.length > 2) {
      showToast("Solo puedes subir un máximo de 2 archivos PDF.", "error");
      return;
    }
    setSelectedPDFs((prev) => [...prev, ...files]);
    setPdfPreviews((prev) => [...prev, ...files.map((file) => file.name)]);
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const removePDF = (index: number) => {
    setSelectedPDFs((prev) => prev.filter((_, i) => i !== index));
    setPdfPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    if (!content || content.trim().length < 3) {
      showToast("El contenido debe tener al menos 3 caracteres.", "error");
      setStatus("error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("category", category);
      formData.append("content", content);

      selectedFiles.forEach((file) => formData.append("cover", file));
      selectedPDFs.forEach((file) => formData.append("file", file));

      await createPublication(formData);
      setStatus("success");
      showToast("¡Publicación creada exitosamente!", "success");
      // Limpia los campos del formulario
      setTitle("");
      setAuthor("");
      setContent("");
      setCategory("");
      setSelectedFiles([]);
      setSelectedPDFs([]);
      setPreviews([]);
      setPdfPreviews([]);
      await refetch();
    } catch (error) {
      console.error("Error al crear la publicación:", error);
      showToast("Error al crear la publicación.", "error");
      setStatus("error");
    }
  };

  return (
    <>
      <Title
        title="Crear Publicaciones"
        description="Aquí puedes crear las publicaciones"
        buttonName="Ver Publicaciones"
        link="/publicacion"
      />
  
      <section className="w-full px-5 py-5">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Primera Columna */}
            <fieldset className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Autor <span className="text-red-500">*</span>
                </label>
                <input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Categoría <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="w-full p-2 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((categoryOption) => (
                      <SelectItem key={categoryOption} value={categoryOption}>
                        {categoryOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imágenes
                </label>
                <ImageUploader
                  previews={previews}
                  onDrop={handleImageDrop}
                  removeImage={removeImage}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Archivos PDF
                </label>
                <PDFUploader
                  previews={pdfPreviews}
                  onDrop={handlePDFDrop}
                  removeFile={removePDF}
                />
              </div>
            </fieldset>

            {/* Segunda Columna */}
            <fieldset className="space-y-6">
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contenido <span className="text-red-500">*</span>
                </label>
                <div className="border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none overflow-hidden">
                  <ReactQuill
                    id="content"
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    className="h-[580px] w-full ql-custom"
                    placeholder="Escribe el contenido aquí..."
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5 inline-block mr-2" />
                  {status === "loading" ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </fieldset>
          </div>
        </form>
      </section>
    </>
  );
};

export default PublicationCreate;
