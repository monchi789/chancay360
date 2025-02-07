export default function ValueProposition() {
    const CARDS = [
      {
        title: "Chancay, una Ciudad en Transformación",
        description: "Con el nuevo puerto, Chancay se posiciona como el puente entre Asia y Sudamérica.",
        link: "Ver Proyecciones",
        color: "bg-red-500",
        hoverColor: "hover:bg-red-400",
      },
      {
        title: "Oportunidades de Inversión Estratégica",
        description: "Descubre proyectos en infraestructura, bienes raíces, turismo y más.",
        link: "Explorar Ahora",
        color: "bg-blue-500",
        hoverColor: "hover:bg-blue-400",
      },
      {
        title: "Conexión Global",
        description: "Un puerto diseñado para movilizar un millón de contenedores al año.",
        link: "Explorar Ahora",
        color: "bg-green-500",
        hoverColor: "hover:bg-green-400",
      },
    ];
  
    return (
      <section className="py-20 bg-[#F4F3EE]">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-extrabold text-gray-900 text-left mb-12">Nuestra propuesta de valor</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CARDS.map((card, index) => (
              <div
                key={index}
                className="group relative cursor-pointer overflow-hidden bg-white p-10 shadow-xl 
                          ring-1 ring-gray-900/5 transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-2xl 
                          sm:mx-auto sm:max-w-md sm:rounded-lg flex flex-col h-full"
              >
                {/* Círculo expansivo en el fondo */}
                <span
                  className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full ${card.color} transition-all duration-500 ease-in-out group-hover:scale-[12] opacity-20`}
                ></span>
                <div className="relative z-10 flex flex-col items-center text-center flex-grow">
                  <h3 className="text-2xl font-bold mt-6 text-gray-900">{card.title}</h3>
                  <p className="text-lg text-gray-700 mt-4 leading-relaxed flex-grow">{card.description}</p>
                  <div className="mt-12 flex justify-center w-full">
                    <a 
                      href="#" 
                      className={`px-8 py-4 text-white text-lg font-semibold rounded-full ${card.color} ${card.hoverColor} transition-all duration-500 ease-in-out shadow-md hover:shadow-lg transform hover:scale-110`}
                    >
                      {card.link} &rarr;
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  