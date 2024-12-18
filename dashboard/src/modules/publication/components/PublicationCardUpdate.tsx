import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Publication } from "@/interfaces/Publication";
import { getPublicationById, updatePublication } from "../services/Publication.api";
import { useQueryClient } from "@tanstack/react-query";

interface PublicationCardUpdateProps {
  idPublication: string;
  onClose: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const PublicationCardUpdate: React.FC<PublicationCardUpdateProps> = ({
  idPublication,
  onClose,
}) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Publication>({
    author: "",
    title: "",
    content: "",
    category: "",
    publicationDate: new Date(),
    createAt: new Date(),
    updateAt: new Date(),
    cover: [],
    file: [],
  });

  // Si quisieras incluir la lógica para gestionar archivos del lado del frontend,
  // deberías tener un estado separado para `selectedFiles` (tipo File[]) si 
  // realmente subes imágenes/archivos. Por ejemplo:
  // const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublication = async () => {
      setStatus("loading");
      try {
        const publication = await getPublicationById(idPublication);
        setFormData(publication);
        setStatus("idle");
      } catch (error) {
        console.error("Error al cargar la publicación:", error);
        setErrorMessage("Error al cargar la publicación.");
        setStatus("error");
      }
    };
    fetchPublication();
  }, [idPublication]);

  const validateField = (name: string, value: string): string => {
    if (!value || value.length < 3) {
      return `${name} debe tener al menos 3 caracteres`;
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (formData.title) {
      const titleError = validateField("title", formData.title);
      if (titleError) {
        newErrors.title = titleError;
        isValid = false;
      }
    }

    if (formData.author) {
      const authorError = validateField("author", formData.author);
      if (authorError) {
        newErrors.author = authorError;
        isValid = false;
      }
    }

    if (formData.content) {
      const contentError = validateField("content", formData.content);
      if (contentError) {
        newErrors.content = contentError;
        isValid = false;
      }
    }

    if (formData.category) {
      const categoryError = validateField("category", formData.category);
      if (categoryError) {
        newErrors.category = categoryError;
        isValid = false;
      }
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatus("loading");

    if (!validateForm()) {
      setStatus("error");
      setErrorMessage("Por favor, corrige los errores en el formulario.");
      return;
    }

    // Crear FormData a partir de formData (Publication)
    const formDataToSend = new FormData();
    // Solo agregamos los campos que queremos actualizar.
    // Por ejemplo: title, author, content, category
    // Asegúrate de que el backend esté preparado para recibir estos campos vía FormData.
    formDataToSend.append("title", formData.title);
    formDataToSend.append("author", formData.author);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("category", formData.category);

    // Si tu backend procesa archivos:
    // selectedFiles.forEach(file => {
    //   formDataToSend.append("cover", file);
    // });

    try {
      await updatePublication(idPublication, formDataToSend);
      setStatus("success");
      queryClient.invalidateQueries({ queryKey: ["publications"] });
      setTimeout(onClose, 100);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Error desconocido");
      }
      setStatus("error");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Editar Publicación
      </h2>

      {status === "success" && (
        <p className="text-green-600 bg-green-100 p-2 rounded-lg">
          Publicación actualizada con éxito.
        </p>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        {formData.idPublication && (
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              ID
            </label>
            <input
              type="text"
              value={formData.idPublication}
              className="block w-full mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
              disabled
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm ${
              validationErrors.title
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 ${
              validationErrors.title
                ? "focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {validationErrors.title && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Autor
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm ${
              validationErrors.author
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 ${
              validationErrors.author
                ? "focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {validationErrors.author && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.author}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Contenido
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm ${
              validationErrors.content
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 ${
              validationErrors.content
                ? "focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {validationErrors.content && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.content}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Categoría
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm ${
              validationErrors.category
                ? "border-red-500"
                : "border-gray-300"
            } focus:outline-none focus:ring-2 ${
              validationErrors.category
                ? "focus:ring-red-500"
                : "focus:ring-blue-500"
            }`}
          />
          {validationErrors.category && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.category}</p>
          )}
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Save className="w-4 h-4 inline-block mr-1" /> Guardar
        </button>
      </div>
    </form>
  );
};

export default PublicationCardUpdate;
