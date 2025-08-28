import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import CallToAction from '@/components/CallToAction';
import { stages } from '@/content/stages';

interface StageDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return stages.map((stage) => ({
    slug: stage.slug,
  }));
}

export async function generateMetadata({ params }: StageDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const stage = stages.find((s) => s.slug === resolvedParams.slug);
  
  if (!stage) {
    return {};
  }

  return {
    title: `${stage.name} | Balam Barabata`,
    description: stage.description,
  };
}

export default async function StageDetailPage({ params }: StageDetailPageProps) {
  const resolvedParams = await params;
  const stage = stages.find((s) => s.slug === resolvedParams.slug);

  if (!stage) {
    notFound();
  }

  return (
    <div className="pt-16">
      {/* Hero de la etapa específica */}
      <section className="relative h-96 bg-gradient-to-br from-selva to-chukum-800 flex items-center justify-center">
        <Image
          src={`https://placehold.co/1200x400/2a4d3f/ffffff?text=${encodeURIComponent(stage.name)}`}
          alt={stage.name}
          fill
          className="object-cover opacity-30"
        />
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {stage.name}
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed">
            {stage.description}
          </p>
        </div>
      </section>

      {/* Detalles de la etapa */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Características Principales
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-chukum-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-chukum-600 font-bold">📍</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Ubicación Privilegiada</h3>
                    <p className="text-gray-600">
                      {stage.slug === 'primicia' && 'Zona más exclusiva del desarrollo, rodeada de vegetación nativa.'}
                      {stage.slug === 'comunidad-sustentable' && 'Acceso directo al ecoparque central y todas las amenidades.'}
                      {stage.slug === 'ciudadanos-eco-bio' && 'Cercana al área comercial con servicios y comodidades.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-chukum-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-chukum-600 font-bold">🏡</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Lotes Disponibles</h3>
                    <p className="text-gray-600">
                      {stage.lots} lotes de diferentes tamaños, desde 500m² hasta 2,000m².
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-chukum-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-chukum-600 font-bold">💲</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Precio por m²</h3>
                    <p className="text-gray-600">
                      ${stage.price.toLocaleString()} pesos M.N/m²
                      {stage.slug === 'primicia' && ' (Con descuento del 30% en preventa)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Plan de Desarrollo
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Infraestructura eléctrica subterránea</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Sistema de tratamiento de aguas</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Caminos ecológicos permeables</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Conectividad de fibra óptica</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Áreas verdes comunitarias</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-300 rounded-full mr-3"></div>
                  <span className="text-gray-700">Centro comunitario</span>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>Completado
                <span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-2 ml-4"></span>En progreso
                <span className="inline-block w-3 h-3 bg-gray-300 rounded-full mr-2 ml-4"></span>Planificado
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de imágenes conceptuales */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Visualiza tu futuro hogar
            </h2>
            <p className="text-xl text-gray-600">
              Renders conceptuales de cómo se verá {stage.name} una vez completada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative h-64 bg-gray-200 rounded-xl overflow-hidden">
                <Image
                  src={`https://placehold.co/400x300/2a4d3f/ffffff?text=Vista+${i}`}
                  alt={`Vista conceptual ${i} de ${stage.name}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navegación entre etapas */}
      <section className="py-12 bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link
              href="/etapas"
              className="text-selva hover:text-chukum-600 font-medium transition-colors"
            >
              ← Ver todas las etapas
            </Link>
            
            <div className="flex space-x-4">
              {stages.map((s) => (
                <Link
                  key={s.slug}
                  href={`/etapas/${s.slug}`}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    s.slug === stage.slug
                      ? 'bg-selva text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Etapa {stages.indexOf(s) + 1}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  );
}
