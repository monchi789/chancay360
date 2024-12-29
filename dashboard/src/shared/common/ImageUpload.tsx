import React from "react";
import { useDropzone } from "react-dropzone";
import { Image } from "lucide-react"; // Icono de imagen
import { CircleX } from "lucide-react";

interface ImageUploaderProps {
  previews: string[];
  onDrop: (files: File[]) => void;
  removeImage: (index: number) => void;
  validationError?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  previews,
  onDrop,
  removeImage,
  validationError,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"], // Aceptar solo imágenes
    },
    multiple: true, // Permitir múltiples archivos
  });

  return (
    <div>
      {/* Área de Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer flex flex-col items-center justify-center
        ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        ${validationError ? "border-red-500" : ""}`}
      >
        <input {...getInputProps()} />
        <Image className="w-12 h-12 text-gray-400 mb-2" /> {/* Icono de imagen */}
        {isDragActive ? (
          <p className="text-gray-700 font-medium">Suelta las imágenes aquí...</p>
        ) : (
          <p className="text-gray-600">
            <span className="text-blue-600 font-medium">Cargar archivo</span> o arrastre y suelte aquí

          </p>
        )}
        <p className="text-sm text-gray-400 mt-1">jpeg, png, jpg o gif </p>
      </div>

      {validationError && <p className="mt-1 text-sm text-red-600">{validationError}</p>}

      {/* Vista previa de imágenes */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <img
              src={preview}
              alt={`Upload ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg shadow"
            />
            <button
              type="button"
              onClick={() => removeImage(index)} // Eliminar la imagen
              className="absolute top-1 right-1 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            >
              <CircleX size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
