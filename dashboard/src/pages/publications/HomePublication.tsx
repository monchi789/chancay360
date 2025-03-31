

import * as React from "react"
import CardPublication from "@/components/publications/CardPublication"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

const HomePublication = () => {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  return (
    <div className="px-4 py-1">
      <div className="flex justify-between items-center mb-5">
      <div className="flex gap-3">
  <h1 className="text-3xl font-bold ">
    Home Publication
  </h1>
</div>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="text-xl border-red-[#b88557] border-2 hover:bg-red-300 hover:text-white"
            asChild
          >
            <Button variant="outline">Filtrar</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Tipo de Publicación</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Noticias
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Proyectos
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Trabajos
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Revistas
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Grid de publicaciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <CardPublication key={index} />
        ))}
      </div>
    </div>
  )
}

export default HomePublication
