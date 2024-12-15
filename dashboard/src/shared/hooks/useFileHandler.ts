import {useCallback, useState} from "react";

export const useFileHandler = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviewss] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);

    const newPreview = acceptedFiles.map((file) => URL.createObjectURL(file));
    setPreviewss((prevPreview) => [...prevPreview, ...newPreview]);
  }, []);

  const removeImage = (indexToRemove: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    setPreviewss((prevPreviews) => {
      URL.revokeObjectURL(prevPreviews[indexToRemove]);
      return prevPreviews.filter((_, index) => index !== indexToRemove);
    })
  }
  
  return {
    files,
    previews,
    onDrop,
    removeImage,
    reset: () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
      setFiles([]);
      setPreviewss([]);
    }
    
  }
}
