import Link from 'next/link';
import Image from 'next/image';
import { Stage } from '@/content/stages';

interface StageCardProps {
  stage: Stage;
}

export default function StageCard({ stage }: StageCardProps) {
  return (
    <Link href={`/etapas/${stage.slug}`} className="block group">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-105">
        <div className="relative h-48 bg-gradient-to-br from-chukum-100 to-chukum-200">
          <Image
            src={`https://placehold.co/400x200/2a4d3f/ffffff?text=${encodeURIComponent(stage.name)}`}
            alt={stage.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-selva/20" />
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-selva transition-colors">
            {stage.name}
          </h3>
          
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
