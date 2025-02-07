export default function JobBoard() {
    return (
      <section className="py-24 bg-[#F4F3EE]">
        <div className="max-w-7xl mx-auto px-8">
          {/* Título */}
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Bolsa de Empleo
        </h2>
          <div className="relative bg-[#E3D5C0] px-14 sm:px-20 py-20 rounded-[50px] sm:rounded-[70px] text-center shadow-xl">
            <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
              <span >Conéctate</span> a las Nuevas{" "}
              <span >Oportunidades</span> Laborales.
            </h3>
            <p className="text-gray-900 mt-6 text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto">
              Publica tu <span className="font-bold text-red-700">CV</span>, accede a{" "}
              <span className="font-bold">vacantes exclusivas</span> y sé parte de la
              transformación económica de <span className="font-bold">Chancay</span>.
            </p>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="relative">
               
                <a
                  href="/bolsa-empleo"
                  className="relative inline-flex items-center text-red-700 text-xl font-bold bg-[#F4F3EE] px-10 py-5 rounded-full transition-all hover:bg-red-100 shadow-lg hover:shadow-xl"
                >
                  Ir a la Bolsa de Empleo
                  <span className="ml-3 transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  