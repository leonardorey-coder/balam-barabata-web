import { Metadata } from 'next';
import AmenityCard from '@/components/AmenityCard';
import CallToAction from '@/components/CallToAction';
import { amenities } from '@/content/amenities';

export const metadata: Metadata = {
  title: 'Amenidades | Balam Barabata',
  description: 'Descubre las amenidades únicas de Balam Barabata: temazcal, cenote, senderos botánicos, meliponario, huertos orgánicos y área deportiva.',
};

export default function AmenidadesPage() {
  return (
    <div className="pt-16">
      {/* Hero de amenidades */}
      <section className="relative py-20 bg-gradient-to-br from-chukum-50 to-chukum-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Amenidades Únicas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Espacios diseñados para el bienestar, la conexión con la naturaleza 
              y el desarrollo de una comunidad consciente y sustentable.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de amenidades */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity) => (
              <AmenityCard key={amenity.id} amenity={amenity} />
            ))}
          </div>
        </div>
      </section>

      {/* Sección adicional sobre el enfoque sustentable */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Enfoque Regenerativo
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cada amenidad está diseñada no solo para el disfrute, sino para contribuir 
              positivamente al ecosistema y la comunidad local.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Preservación Cultural
              </h3>
              <p className="text-gray-600 mb-6">
                Nuestras amenidades honran las tradiciones mayas mientras incorporan 
                tecnologías sustentables modernas. El temazcal y el meliponario son 
                ejemplos de cómo preservamos el conocimiento ancestral.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Biodiversidad
              </h3>
              <p className="text-gray-600">
                Los senderos botánicos y huertos orgánicos crean corredores biológicos 
                que permiten la regeneración natural de la flora y fauna nativa.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-selva mb-6">
                Impacto Positivo
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-chukum-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">+50 especies de plantas medicinales</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-chukum-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Protección de abejas meliponas</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-chukum-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">Captura de 200 tons CO₂/año</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-chukum-500 rounded-full mr-3"></span>
                  <span className="text-gray-700">100% energías renovables</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
