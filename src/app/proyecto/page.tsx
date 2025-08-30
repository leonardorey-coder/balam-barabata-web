import Hero from '@/components/Hero';
import AmenityCard from '@/components/AmenityCard';
import StageCard from '@/components/StageCard';
import CallToAction from '@/components/CallToAction';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import IdealForCarousel from '@/components/IdealForCarousel';
import Gallery from '@/components/Gallery';
import QualitiesMarquee from '@/components/QualitiesMarquee';
import { amenities } from '@/content/amenities';
import { stages } from '@/content/stages';
import Link from 'next/link';
import SegmentedVideo from '@/components/SegmentedVideo';

const testimonials = [
  {
    name: "Alex",
    comment: "Aquí pude asegurar mi patrimonio mientras disfruto de un entorno natural increíble.",
    avatar: "/images/testimonial-1.jpg"
  },
  {
    name: "María",
    comment: "Balam Barabata me ofreció la combinación perfecta entre un entorno natural impresionante y la posibilidad de desarrollar un proyecto turístico con gran potencial de inversión.",
    avatar: "/images/testimonial-2.jpg"
  },
  {
    name: "Carlos",
    comment: "Balam Barabata superó mis expectativas: un lugar exclusivo rodeado de naturaleza, ideal para invertir.",
    avatar: "/images/testimonial-3.jpg"
  },
  {
    name: "Sofia",
    comment: "Invertir en Balam Barabata fue una decisión que superó mis expectativas. Aquí no solo aseguré mi patrimonio, sino que también encontré un refugio personal rodeado de naturaleza.",
    avatar: "/images/testimonial-4.jpg"
  }
];

const idealForData = [
  {
    title: "Refugio personal",
    description: "Un lugar tranquilo y exclusivo para vivir o vacacionar.",
    price: "$ 2,500",
    location: "Balam Barabata – Quintana Roo",
    backgroundImage: "/images/galery/modelo1.jpeg",
  },
  {
    title: "Desarrollos inmobiliarios",
    description: "Oportunidad para crear proyectos residenciales o ecológicos.",
    price: "$ 3,000",
    location: "Balam Barabata – Riviera Maya",
    backgroundImage: "/images/galery/modelo2.jpeg",
  },
  {
    title: "Familias y parejas",
    description: "Privacidad, tranquilidad y naturaleza a pocos minutos de Tulum y Playa del Carmen.",
    price: "$ 8,000",
    location: "Balam Barabata – Akumal",
    backgroundImage: "/images/galery/modelo3.jpeg",
  },
  {
    title: "Emprendedores ecológicos",
    description: "El lugar ideal para proyectos sostenibles con impacto ambiental positivo.",
    price: "$ 2,700",
    location: "Balam Barabata – Riviera Maya",
    backgroundImage: "/images/galery/modelo4.jpeg",
  },
  {
    title: "Proyectos turísticos",
    description: "Ideal para cabañas, glamping o retiros en plena selva.",
    price: "$ 4,200",
    location: "Balam Barabata – Quintana Roo",
    backgroundImage: "/images/galery/modelo5.jpeg",
  },
  {
    title: "Inversionistas visionarios",
    description: "Terrenos con alta plusvalía en un entorno natural único.",
    price: "$ 3,000",
    location: "Balam Barabata – Riviera Maya",
    backgroundImage: "/images/galery/modelo6.jpeg",
  }
];

export default function Home() {
  return (
    <div>
      <Hero />
      
      {/* Cualidades y garantías del proyecto - Marquee */}
      <div className="my-8 md:my-10">
        <QualitiesMarquee />
      </div>
      
      {/* Sección Qué es Balam Barabata */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-semibold text-gray-900 mb-8">
                ¿Qué es el proyecto Balam Barabata?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Balam Barabata es un desarrollo sustentable ubicado en Uxuxubí, Quintana Roo,
                rodeado de selva, cenotes y fauna silvestre. El nombre &quot;Balam Barabata&quot; significa &quot;Jaguar Valiente&quot;
                (Balam significa &quot;jaguar&quot; en maya y Barabata &quot;bravata&quot; o &quot;valiente&quot; según el diccionario histórico 
                de la lengua española evocando resiliencia y valor). Uxuxubí quiere decir &quot;el que silva&quot;, 
                el nombre se originó en los campamentos chicleros, cuando los trabajadores se comunicaban 
                entre sí con un silvido diferente de acuerdo a lo que deseaban comunicar.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Este paraíso natural se ha convertido en un área de alto interés inmobiliario, 
                gracias a su cercanía con Akumal, Tulum y el resto de la Riviera Maya, además de su creciente 
                proyección como un destino ecoturístico y de inversión sostenible.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Balam Barabata no solo es un lugar para invertir, sino una oportunidad para formar 
                parte del futuro sostenible de Uxuxubí y la Riviera Maya.
              </p>
            </div>
            
            <div className="relative">
              <div className="relative aspect-video rounded-3xl overflow-hidden">
                <SegmentedVideo
                  start={10}
                  duration={5}
                  className="w-full h-full object-cover"
                  poster="/images/selva.jpg"
                  sources={[
                    {
                      src: '/videos/intro.mobile.mp4#t=10,15',
                      media: '(max-width: 768px)',
                      type: 'video/mp4',
                    },
                    {
                      src: '/videos/intro.mp4#t=10,15',
                      type: 'video/mp4',
                    },
                  ]}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/30" />
              </div>
            </div>
          </div>
          
          {/* Statistics */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-semibold text-gray-900 mb-2">1000+</div>
              <div className="text-lg text-gray-600">Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-semibold text-gray-900 mb-2">500+</div>
              <div className="text-lg text-gray-600">Propiedades registradas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenidades destacadas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Amenidades Únicas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Disfruta de espacios diseñados para el bienestar, la conexión con la naturaleza 
              y el desarrollo de una comunidad consciente.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {amenities.slice(0, 6).map((amenity) => (
              <AmenityCard key={amenity.id} amenity={amenity} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/amenidades"
              className="inline-block bg-chukum-600 hover:bg-chukum-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Ver Todas las Amenidades
            </Link>
          </div>
        </div>
      </section>

      {/* Ideal Para Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-center text-5xl font-bold text-gray-900 mb-6">Ideal Para</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Balam Barabata es el destino perfecto para quienes buscan combinar naturaleza, inversión
                y exclusividad. Ya sea que quieras asegurar tu patrimonio, desarrollar un proyecto turístico
                o encontrar un refugio personal en la Riviera Maya, aquí encontrarás la oportunidad ideal
                en un entorno único y sostenible.
              </p>
            </div>

            <div>
              <IdealForCarousel data={idealForData} />
            </div>
          </div>
        </div>
      </section>

      {/* Etapas disponibles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Etapas Disponibles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Elige la etapa que mejor se adapte a tu estilo de vida. 
              Cada una diseñada con características únicas y acceso privilegiado a las amenidades.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {stages.map((stage) => (
              <StageCard key={stage.slug} stage={stage} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/etapas"
              className="inline-block bg-selva hover:bg-selva/90 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Explorar Todas las Etapas
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Clientes Satisfechos</h2>
          </div>
          
        </div>
        <TestimonialsCarousel testimonials={testimonials} />
      </section>

      <CallToAction />
    </div>
  );
}
