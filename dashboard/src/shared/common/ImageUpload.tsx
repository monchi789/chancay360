import React from "react";
import { useDropzone } from "react-dropzone";
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
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${validationError ? "border-red-500" : ""}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta las imágenes aquí...</p>
        ) : (
          <p>Arrastra y suelta imágenes aquí, o haz clic para seleccionar</p>
        )}
      </div>
      {validationError && <p className="mt-1 text-sm text-red-600">{validationError}</p>}

      <div className="mt-4 grid grid-cols-4 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <img
              src={preview} 
              alt={`Upload ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => removeImage(index)} // Eliminar la imagen
              className="absolute top-1 right-1 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
            >
              <CircleX />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
