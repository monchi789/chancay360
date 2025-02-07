import Button from "./Button";

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
                <Button text="Ir a la Bolsa de Empleo" href="/bolsa" variant="secondary"/> 
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  