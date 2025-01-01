import React from "react";
import { useDropzone } from "react-dropzone";
import { CircleX } from "lucide-react";
import { Image } from "lucide-react";


interface ImageUploaderProps {
  previews: string[]; 
  existingPreviews?: string[];
  onDrop: (files: File[]) => void; 
  removeImage: (index: number) => void; 
  removeExistingImage?: (index: number) => void; 
  validationError?: string | null; 
  
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  previews,
  existingPreviews = [],
  onDrop,
  removeImage,
  removeExistingImage,
  validationError,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg", ".gif"] },
    multiple: true,
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
        <Image className="w-12 h-12 text-gray-400 mb-2" />
        {isDragActive ? (
          <p className="text-gray-700 font-medium">Suelta las imágenes aquí...</p>
        ) : (
          <p className="text-gray-600">
            <span className="text-blue-600 font-medium">Cargar archivo</span> o arrastra y suelta aquí
          </p>
        )}
        <p className="text-sm text-gray-400 mt-1">jpeg, png, jpg o gif</p>
      </div>

      {validationError && <p className="mt-1 text-sm text-red-600">{validationError}</p>}

      {/* Imágenes Existentes */}
      {existingPreviews.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mt-4">Imágenes Existentes:</h3>
          <div className="mt-2 grid grid-cols-4 gap-4">
            {existingPreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Existing Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg shadow"
                />
                {removeExistingImage && (
                  <button
                    type="button"
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                  >
                    <CircleX size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nuevas Imágenes */}
      {previews.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mt-4">Nuevas Imágenes:</h3>
          <div className="mt-2 grid grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg shadow"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                >
                  <CircleX size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
