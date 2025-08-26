import { 
  HomeModernIcon, 
  GlobeAltIcon, 
  MapIcon, 
  SparklesIcon,
  BeakerIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline';
import { Amenity } from '@/content/amenities';

interface AmenityCardProps {
  amenity: Amenity;
}

const iconMap = {
  temazcal: HomeModernIcon,
  cenote: GlobeAltIcon,
  senderos: MapIcon,
  meliponario: SparklesIcon,
  huertos: BeakerIcon,
  'area-deportiva': PlayCircleIcon,
};

export default function AmenityCard({ amenity }: AmenityCardProps) {
  const IconComponent = iconMap[amenity.id as keyof typeof iconMap] || SparklesIcon;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-chukum-100 rounded-lg flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-chukum-600" aria-hidden="true" />
          </div>
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{amenity.title}</h3>
        </div>
      </div>
      
      <p className="text-gray-600 leading-relaxed">{amenity.description}</p>
    </div>
  );
}
