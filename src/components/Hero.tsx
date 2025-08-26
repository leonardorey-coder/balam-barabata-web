import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-selva to-chukum-800">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/selva.jpg"
        aria-hidden="true"
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      
  <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight opacity-0 motion-safe:animate-fade-in-up motion-safe:[animation-delay:0ms]">
          Enamórate de Uxuxubi
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed opacity-0 motion-safe:animate-fade-in-up motion-safe:[animation-delay:150ms]">
          Terrenos en Uxuxubi, un paraíso natural cerca de Tulum. 
          Invierte seguro en un desarrollo sustentable con plusvalía, acceso controlado y amenidades únicas.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <Link
            href="/etapas"
            className="inline-block bg-chukum-600 hover:bg-chukum-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-300 transform hover:scale-105 opacity-0 motion-safe:animate-fade-in-up motion-safe:[animation-delay:300ms]"
          >
            Ver Etapas Disponibles
          </Link>
          <Link
            href="/amenidades"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-selva font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 opacity-0 motion-safe:animate-fade-in-up motion-safe:[animation-delay:450ms]"
          >
            Conocer Amenidades
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}
