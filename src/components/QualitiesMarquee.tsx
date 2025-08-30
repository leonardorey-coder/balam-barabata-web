'use client';

import { useEffect, useState } from 'react';

interface QualitiesMarqueeProps {
  /** Animation duration in seconds (optional, defaults to 25s) */
  duration?: number;
}

// Componentes SVG para los íconos
const LeafIcon = () => (
  <svg 
    className="w-6 h-6 text-green-600 opacity-60" 
    fill="currentColor" 
    viewBox="0 0 24 24"
  >
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
  </svg>
);

const EcoIcon = () => (
  <svg
    className="w-6 h-6 text-green-600 opacity-60"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {/* Globe outline */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25Z"
    />
    {/* Simple meridian & parallel to hint sustainability */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2.25c0 3.75 0 6.75-4.5 9.75 4.5 0 4.5 3 4.5 6.75"
    />
  </svg>
);

const NatureIcon = () => (
  <svg
    className="w-6 h-6 text-green-600 opacity-60"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {/* Central sun disk */}
    <circle cx="12" cy="12" r="4.5" />
    {/* Rays */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v2.5M12 19.25v2.5M4.21 4.21l1.77 1.77M17.99 17.99l1.77 1.77M2.25 12h2.5M19.25 12h2.5M4.21 19.79l1.77-1.77M17.99 6.01l1.77-1.77" />
  </svg>
);

const ProtectedAreaIcon = () => (
  <svg
    className="w-6 h-6 text-green-600 opacity-60"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {/* Shield outline */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3l7.5 4v5c0 5-3.5 9.5-7.5 11-4-1.5-7.5-6-7.5-11V7l7.5-4z"
    />
    {/* Leaf inside shield */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 11c1.5-1 2.5-2.5 2.5-4S13.5 4 12 4 9.5 5.5 9.5 7s1 3 2.5 4Zm0 0v5"
    />
  </svg>
);

export default function QualitiesMarquee({
  duration = 25,
}: QualitiesMarqueeProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Cualidades y garantías del proyecto con íconos SVG
  const qualities = [
    { icon: <EcoIcon />, text: "Proyecto 100% sustentable" },
    { icon: <LeafIcon />, text: "Certificado de construcción verde" },
    { icon: <NatureIcon />, text: "Respeto al ecosistema" },
    { icon: <ProtectedAreaIcon />, text: "70% de área verde protegida" }
  ];

  // Repetimos más veces para que el track sea largo y el loop tarde más
  const items = Array.from({ length: 6 }).flatMap(() => qualities);

  // Queremos que la velocidad equivalga a 6 s por ancho‑viewport,
  // pero el loop dure 24 s (4 × distancia) para ver más qualities antes de reiniciar.
  const actualDuration = isClient && isMobile ? 24 : duration;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-25 via-white to-gray-25 py-6 opacity-90">
      {/* Gradientes laterales para efecto de desvanecimiento */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
      
      <div
        className={`flex space-x-12 md:space-x-16 whitespace-nowrap ${
          isMobile ? '' : 'animate-marquee'
        }`}
        style={
          isMobile
            ? { animation: `marquee-mobile ${actualDuration}s linear infinite` }
            : { animationDuration: `${actualDuration}s` }
        }
      >
        {items.map((quality, index) => (
          <div key={index} className="flex-shrink-0 flex items-center space-x-2 md:space-x-3">
            {quality.icon}
            <span className="text-base md:text-lg font-medium text-selva/70 tracking-wide">
              {quality.text}
            </span>
          </div>
        ))}
      </div>

      {/* Keyframes solo para mobile: recorre -400 % (≈ 4× viewport) */}
      <style jsx global>{`
        @keyframes marquee-mobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-400%);
          }
        }
      `}</style>
    </div>
  );
}
