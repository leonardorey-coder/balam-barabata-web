import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="relative py-16">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{ backgroundImage: 'url(/images/calltoactions.jpg)' }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Forma parte de Balam Barabata
        </h2>
        <p className="text-xl text-white/90 mb-8 leading-relaxed">
          Un lugar donde la modernidad y la naturaleza conviven en perfecta armonía.
          Descubre una nueva forma de vivir en la selva yucateca.
        </p>

        <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
          <Link
            href="/contacto"
            className="inline-block bg-white text-selva hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transform transition-all duration-300 ease-out hover:scale-105"
          >
            Agenda una Visita
          </Link>

          <Link
            href="/etapas"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-selva font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Ver Precios
          </Link>
        </div>

        <div className="mt-8 text-white/80 text-sm">
          <p>
            💚 Proyecto 100% sustentable • 🌱 Certificado de construcción verde • 🏞️ Respeto al ecosistema
          </p>
        </div>
      </div>
    </section>
  );
}
