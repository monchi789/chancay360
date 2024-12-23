import React from "react";
import { useDropzone } from "react-dropzone";
import { FileText } from "lucide-react"; // Icono de archivo
import { CircleX } from "lucide-react";

interface PDFUploaderProps {
  previews: string[]; // Nombres de los archivos subidos
  onDrop: (files: File[]) => void;
  removeFile: (index: number) => void;
  validationError?: string | null;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({
  previews,
  onDrop,
  removeFile,
  validationError,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (previews.length + acceptedFiles.length > 2) {
        return; // No permitir más de dos archivos
      }
      onDrop(acceptedFiles);
    },
    accept: {
      "application/pdf": [".pdf"], // Aceptar solo archivos PDF
    },
    multiple: true, // Permitir múltiples archivos, pero limitados en lógica
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
        <FileText className="w-12 h-12 text-gray-400 mb-2" /> {/* Icono de PDF */}
        {isDragActive ? (
          <p className="text-gray-700 font-medium">Suelta los archivos aquí...</p>
        ) : (
          <p className="text-gray-600">
            <span className="text-blue-600 font-medium">Cargar archivo</span> o arrastre y suelte aquí
          </p>
        )}
        <p className="text-sm text-gray-400 mt-1">Solo archivos PDF (máximo 2)</p>
      </div>

      {validationError && <p className="mt-1 text-sm text-red-600">{validationError}</p>}

      {/* Vista previa de archivos */}
      <div className="mt-4">
        {previews.map((fileName, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 border rounded-lg bg-gray-50 shadow-sm mb-2"
          >
            <span className="text-sm text-gray-700">{fileName}</span>
            <button
              type="button"
              onClick={() => removeFile(index)} // Eliminar archivo
              className="text-red-500 hover:text-red-700"
            >
              <CircleX size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PDFUploader;
