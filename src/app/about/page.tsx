export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* SECCIÓN 1: HERO - Quienes Somos */}
      <section className="relative h-[60vh] flex items-center justify-center bg-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1567891299675-c39385567378?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">Nuestra Pasión es el Mar</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light">
            Conectamos a amantes de la navegación con las mejores embarcaciones de la costa.
          </p>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light">
            Discover Cartagena by boat with aSonDeMar. 
          </p>
        </div>
      </section>

      {/* SECCIÓN 2: LA HISTORIA (Quienes Somos) */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">¿Qué es aSonDeMar?</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Una empresa dedicada a ofrecer experiencias memorables conociendo cartagena desde el mar
            </p>
            <p className="text-slate-600 leading-relaxed">
              En aSonDeMar, no solo alquilamos embarcaciones; creamos memorias. Desde una tarde de fiesta con amigos hasta una cena romántica al atardecer, nuestra misión es que tu única preocupación sea disfrutar del horizonte.
            </p>
          </div>
          <div className="bg-slate-100 h-80 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center text-slate-400">
             [ Foto del equipo o de un bote navegando ]
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: VALORES (Por qué nosotros) */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800">¿Por qué confiar en nosotros?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Seguridad Garantizada", desc: "Todas nuestras embarcaciones cuentan con seguros vigentes y capitanes certificados.", icon: "⚓" },
              { title: "Precios Transparentes", desc: "Sin cargos ocultos. Lo que ves es lo que pagas por tu experiencia.", icon: "💰" },
              { title: "Atención 24/7", desc: "Nuestro equipo técnico y de soporte está listo para asistirte en cada milla.", icon: "📱" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:translate-y-[-5px] transition-transform">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: CTA FINAL */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">¿Listo para zarpar?</h2>
        <a href="/" className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg inline-block">
          Explorar la Flota
        </a>
      </section>
    </main>
  );
}