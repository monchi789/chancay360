export default function CTA() {
    return (
      <section className="py-20 bg-[#F4F3EE] text-center relative">
        <div className="max-w-screen-lg mx-auto px-6 lg:px-12 relative">
          {/* Línea superior */}
          <div className="w-full border-t border-gray-300 mb-20"></div>
  
          {/* Texto principal */}
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Sé parte de la evolución de{" "}
            <span className="text-red-600">Chancay</span>.
          </h2>
          <p className="text-lg sm:text-xl text-gray-800 mt-6">
            Conectamos tus intereses con el crecimiento de una ciudad que{" "}
            <span className="font-bold">liderará Latinoamérica.</span>
          </p>
  
          {/* Botones alineados correctamente */}
          <div className="mt-10 flex justify-center space-x-6">
            <a
              href="/contacto"
              className="inline-flex items-center justify-center w-48 px-6 py-3 border border-red-600 text-red-600 font-semibold rounded-full transition-all hover:bg-red-100 text-lg"
            >
              Contáctanos
            </a>
            <a
              href="/empieza"
              className="inline-flex items-center justify-center w-48 px-6 py-3 bg-red-600 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition-all text-lg"
            >
              Comienza Ahora
            </a>
          </div>
  
          {/* Línea inferior */}
          <div className="w-full border-t border-gray-300 mt-20"></div>
        </div>
      </section>
    );
  }
  