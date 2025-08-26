import Link from 'next/link';

interface IdealForCardProps {
  title: string;
  description: string;
  price: string;
  location: string;
  buttonText?: string;
  backgroundImage?: string;
}

export default function IdealForCard({ 
  title, 
  description, 
  price, 
  location, 
  buttonText = "Cotizar",
  backgroundImage 
}: IdealForCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-blue-100 flex flex-col min-h-[560px]">
      {/* Image section */}
      <div className="h-80 bg-gradient-to-b from-black/10 via-transparent to-black/90 relative">
        {backgroundImage ? (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />
        
        {/* Price */}
        <div className="absolute top-6 right-6">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-lg font-semibold text-lg">
            {price}
          </span>
        </div>

        {/* Location */}
        <div className="absolute bottom-6 left-6 flex items-center text-white">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">{location}</span>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        <Link
          href="/contacto"
          className="inline-block bg-white border border-gray-300 hover:border-gray-400 text-gray-900 font-medium py-3 px-8 rounded-3xl transition-colors duration-300 hover:bg-gray-50 mt-auto"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
