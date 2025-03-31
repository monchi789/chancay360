
import { useState } from "react"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import ImageUploader from "@/components/shared/ImageUpload"
import PDFUploader from "@/components/shared/PdfUpload"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function CreatePublication() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [coverPreviews, setCoverPreviews] = useState<string[]>([])
  const [pdfPreviews, setPdfPreviews] = useState<string[]>([])

  const handleCoverDrop = (files: File[]) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setCoverPreviews((prev) => [...prev, ...newPreviews])
  }

  const removeCoverImage = (index: number) => {
    setCoverPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePDFDrop = (files: File[]) => {
    const newFileNames = files.map((file) => file.name)
    setPdfPreviews((prev) => [...prev, ...newFileNames])
  }

  const removePDF = (index: number) => {
    setPdfPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Título:", title)
    console.log("Contenido:", content)
    console.log("Portadas:", coverPreviews)
    console.log("PDFs:", pdfPreviews)
    toast.success("¡Publicación guardada con éxito!")
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 py-6 space-y-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Crear Publicación</h1>
      </div>

      {/* Título */}
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ingresa el título de la publicación"
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Contenido</label>
        <div className="rounded-md overflow-hidden bg-white shadow-sm">
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Escribe aquí el contenido..."
            className="h-[360px] rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-md p-2">
          <PDFUploader
            previews={pdfPreviews}
            onDrop={handlePDFDrop}
            removeFile={removePDF}
          />
        </div>
        <div className="rounded-md p-2">
          <ImageUploader
            previews={coverPreviews}
            onDrop={handleCoverDrop}
            removeImage={removeCoverImage}
          />
        </div>
      </div>

      {/* Botones */}
      <div className=" flex gap-2 justify-end">
        <Button type="submit" className="bg-prussian-blue-600">
          Guardar Publicación
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => toast.error("Acción cancelada.")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
