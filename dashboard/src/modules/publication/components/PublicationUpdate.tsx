import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react"; // Íconos
import { useToast } from "@/shared/common/Toast";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "@/shared/common/ImageUpload";
import PDFUploader from "@/shared/common/PdfUpload";
import Title from "@/shared/common/Title";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { getPublicationById, updatePublication } from "../services/Publication.api";

const PublicationUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedPDFs, setSelectedPDFs] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]); // Nuevas imágenes
  const [existingPreviews, setExistingPreviews] = useState<string[]>([]); // Imágenes existentes
  const [pdfPreviews, setPdfPreviews] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const categories = ["Noticias", "Artículos", "Tutoriales", "Eventos"];

  useEffect(() => {
    const fetchPublication = async () => {
      try {
        const data = await getPublicationById(id!);
        setTitle(data.title);
        setAuthor(data.author);
        setContent(data.content);
        setCategory(data.category);
  
        // Configurar URLs completas para imágenes existentes
        const baseURL = process.env.REACT_APP_API_URL || ""; // Usa tu base URL aquí
        setExistingPreviews((data.cover || []).map((img) => `${baseURL}/uploads/publications/covers/${img}`));
        setPdfPreviews(data.file || []);
      } catch (error) {
        showToast("Error al cargar la publicación.", "error");
      }
    };
    fetchPublication();
  }, [id]);
  

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

  const removeExistingImage = (index: number) => {
    setExistingPreviews((prev) => prev.filter((_, i) => i !== index));
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

      // Agregar imágenes existentes que no fueron eliminadas
      existingPreviews.forEach((url) => formData.append("existingCover", url));

      // Agregar nuevas imágenes y PDFs
      selectedFiles.forEach((file) => formData.append("cover", file));
      selectedPDFs.forEach((file) => formData.append("file", file));

      await updatePublication(id!, formData);
      setStatus("success");
      showToast("¡Publicación actualizada exitosamente!", "success");
      navigate("/publicacion");
    } catch (error) {
      showToast("Error al actualizar la publicación.", "error");
      setStatus("error");
    }
  };

  const handleCancel = () => {
    navigate("/publicacion");
  };

  return (
    <>
      <Title
        title="Actualizar Publicación"
        description="Aquí puedes editar las publicaciones existentes"
        buttonName="Cancelar"
        link="/publicacion"
      />

      <section className="w-full px-5 py-5">
        <form onSubmit={handleSubmit} className="space-y-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <fieldset className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
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
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
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
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={(value) => setCategory(value)} value={category}>
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
                  Imágenes Existentes
                </label>
                <ImageUploader
                  previews={previews}
                  existingPreviews={existingPreviews}
                  onDrop={handleImageDrop}
                  removeImage={removeImage}
                  removeExistingImage={removeExistingImage}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Archivos PDF</label>
                <PDFUploader
                  previews={pdfPreviews}
                  onDrop={handlePDFDrop}
                  removeFile={removePDF}
                />
              </div>
            </fieldset>

            <fieldset className="space-y-6">
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
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

              <div className="flex justify-end gap-4 mt-6">
                
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

export default PublicationUpdate;
