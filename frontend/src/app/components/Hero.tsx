import Button from "./Button";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] flex items-center pt-24">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center rounded-b-[40px]"
        style={{ backgroundImage: "url('/images/fondo.png')" }}
      >
        <div className="absolute inset-0 bg-black/70 lg:bg-black/50 rounded-b-[40px]"></div>
      </div>

      {/* Contenido alineado a la izquierda */}
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[65%] lg:max-w-[50%] px-6 sm:px-12 md:px-16 text-left">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold text-white leading-tight">
          Chancay:<br />
          <span className="block text-red-300">El nuevo epicentro</span>
          <span className="block">logístico de Latinoamérica</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white mt-6 italic">
          Aprovecha la transformación que el nuevo puerto trae a la región.  
          <br />
          <span className="font-semibold text-gray-200">Invierte, gestiona y sé parte del crecimiento.</span>
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button text="Explora oportunidades" href="/oportunidades" variant="secondary" />
          <Button text="Descubre el Futuro" href="/futuro" />
        </div>
      </div>
    </section>
  );
}
