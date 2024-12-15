import { useState } from "react";
import { Save } from "lucide-react";
import { Publication } from "@/interfaces/Publication";
import { createPublication } from "../services/Publication.api";
import { useQueryClient } from "@tanstack/react-query";

interface PublicationCreateProps {
  onClose: () => void;
}

interface ValidationErrors {
  [key: string]: string;
}

const PublicationCreate = ({ onClose }: PublicationCreateProps) => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Omit<Publication, "idPublication" | "deleteAt">>({
    author: "",
    title: "",
    content: "",
    cover: [],
    publicationDate: new Date(),
    category: "",
    file: [],
    createAt: new Date(),
    updateAt: new Date(),
  });
  

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setValidationErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: "cover" | "file"
  ) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).map((file) => file.name); // Simulamos que subimos archivos y usamos nombres
      setFormData((prev) => ({ ...prev, [fieldName]: files }));
    }
  };

  const validateField = (name: string, value: string): string => {
    if (!value || value.length < 3) {
      return `${name} debe tener al menos 3 caracteres`;
    }
    return "";
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

    try {
      await createPublication(formData);
      setStatus("success");
      queryClient.invalidateQueries({ queryKey: ["publications"] });
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Error al crear la publicación.");
        setStatus("error");
      }
    }
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

    setValidationErrors(newErrors);
    return isValid;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Crear Publicación
      </h2>

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

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Autor
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.author
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {validationErrors.author && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.author}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Título
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
              validationErrors.title
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {validationErrors.title && (
            <p className="mt-1 text-sm text-red-600">{validationErrors.title}</p>
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
            className="block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
          />
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
            className="block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Fecha de Publicación
          </label>
          <input
            type="date"
            name="publicationDate"
            value={formData.publicationDate.toISOString().split("T")[0]}
            onChange={(e) =>
              setFormData({ ...formData, publicationDate: new Date(e.target.value) })
            }
            className="block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Portadas (Cover)
          </label>
          <input
            type="file"
            name="cover"
            multiple
            onChange={(e) => handleFileChange(e, "cover")}
            className="block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Archivos (File)
          </label>
          <input
            type="file"
            name="file"
            multiple
            onChange={(e) => handleFileChange(e, "file")}
            className="block w-full mt-2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <Save className="w-4 h-4 inline-block mr-1" />
          Guardar
        </button>
      </div>
    </form>
  );
};

export default PublicationCreate;
