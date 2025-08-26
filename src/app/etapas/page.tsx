import { Metadata } from 'next';
import StageCard from '@/components/StageCard';
import CallToAction from '@/components/CallToAction';
import { stages } from '@/content/stages';

export const metadata: Metadata = {
  title: 'Etapas | Balam Barabata',
  description: 'Conoce las tres etapas de desarrollo de Balam Barabata: La Primicia, Comunidad Sustentable y Ciudadanos Eco-bio.',
};

export default function EtapasPage() {
  return (
    <div className="pt-16">
      {/* Hero de etapas */}
      <section className="relative py-20 bg-gradient-to-br from-selva/10 to-selva/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Etapas de Desarrollo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tres etapas cuidadosamente planificadas para crear una comunidad 
              sustentable y regenerativa en armonía con la selva yucateca.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de etapas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {stages.map((stage) => (
              <StageCard key={stage.slug} stage={stage} />
            ))}
          </div>

          {/* Información adicional sobre las etapas */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Desarrollo Progresivo
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-chukum-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-chukum-600">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fase Inicial</h3>
                <p className="text-gray-600 text-sm">
                  Infraestructura básica y primeras amenidades. Conexión con la naturaleza 
                  desde el primer día.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-chukum-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-chukum-600">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Consolidación</h3>
                <p className="text-gray-600 text-sm">
                  Ampliación de servicios y amenidades. Fortalecimiento de la 
                  comunidad sustentable.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-chukum-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-chukum-600">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Madurez</h3>
                <p className="text-gray-600 text-sm">
                  Comunidad completa con área comercial y servicios avanzados. 
                  Ecosistema regenerativo establecido.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de beneficios */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ¿Por qué invertir ahora?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Las primeras etapas ofrecen las mejores oportunidades de inversión 
              con precios preferenciales y ubicaciones privilegiadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Precios Preferenciales
              </h3>
              <p className="text-gray-600">
                Hasta 30% de descuento en la Etapa 1 durante el lanzamiento.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Plusvalía Garantizada
              </h3>
              <p className="text-gray-600">
                Desarrollo progresivo que incrementa el valor de tu inversión.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-3xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Impacto Regenerativo
              </h3>
              <p className="text-gray-600">
                Tu inversión contribuye a la restauración del ecosistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
