  import Link from 'next/link';
import Image from 'next/image';
import { Stage } from '@/content/stages';

interface StageCardProps {
  stage: Stage;
}

export default function StageCard({ stage }: StageCardProps) {
  // Mapeo de las etapas a sus respectivas imágenes
  const getStageImage = (slug: string) => {
    const imageMap: { [key: string]: string } = {
      'primicia': '/images/etapa1.png',
      'comunidad-sustentable': '/images/etapa2.png',
      'ciudadanos-eco-bio': '/images/etapa3.png'
    };
    return imageMap[slug] || '/images/etapa1.png';
  };

  return (
    <Link href={`/etapas/${stage.slug}`} className="block group">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
        <div className="relative h-56">
          <Image
            src={getStageImage(stage.slug)}
            alt={stage.name}
            fill
            className="object-cover"
          />
          {/* Overlay oscuro transparente para mejorar legibilidad */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Solo el nombre de la etapa sobre la imagen */}
          <div className="absolute inset-0 flex items-center justify-center text-center p-4">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">
              {stage.name}
            </h3>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
            <span>{stage.lots} lotes disponibles</span>
            <span className="font-semibold text-chukum-600">
              ${stage.price.toLocaleString()} pesos M.N/m²
            </span>
          </div>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {stage.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-selva font-medium text-sm group-hover:text-chukum-600 transition-colors">
              Ver detalles →
            </span>
            {stage.slug === 'primicia' && (
              <span className="bg-chukum-100 text-chukum-700 px-2 py-1 rounded-full text-xs font-medium">
                30% OFF
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
