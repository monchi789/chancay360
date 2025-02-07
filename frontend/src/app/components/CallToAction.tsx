import Button from "./Button";

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
           <Button text="Contáctanos" href="/contacto" variant="secondary" />
            <Button text="omienza Ahora" href="/empieza" />
          
          </div>
  
          {/* Línea inferior */}
          <div className="w-full border-t border-gray-300 mt-20"></div>
        </div>
      </section>
    );
  }
  