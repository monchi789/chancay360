export default function Hero() {
    return (
      <section className="relative w-full h-[85vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center rounded-b-[20px] lg:rounded-b-[40px]"
          style={{ backgroundImage: "url('/images/fondo.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent rounded-b-[20px] lg:rounded-b-[40px]"></div>
        </div>
  
        {/* Contenido del Hero */}
        <div className="relative z-10 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[65%] mt-20 lg:max-w-[50%] px-6 sm:px-12 md:px-16 lg:px-24 text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight max-w-2xl">
            Chancay:<br />
            <span className="block">El nuevo epicentro</span>
            <span className="block">logístico de Latinoamérica</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white mt-6 max-w-2xl italic">
            Aprovecha la transformación que el nuevo puerto trae a la región.  
            <br />
            <span className="font-semibold">Invierte, gestiona y sé parte del crecimiento.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a 
              href="#" 
              className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold border border-red-700 shadow-lg 
                        hover:bg-red-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 "
            >
              Explora oportunidades
            </a>        
            <a 
              href="#" 
              className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold border border-red-600 shadow-lg 
                        hover:bg-red-100 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Descubre el Futuro
            </a>
          </div>
        </div>
      </section>
    );
  }
  