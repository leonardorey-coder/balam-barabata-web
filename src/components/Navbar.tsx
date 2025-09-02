'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();
  const isPresentacion = pathname?.startsWith('/presentacion');
  const isOverlayPage = pathname === '/' || pathname?.startsWith('/proyecto');

  useEffect(() => {
    if (isPresentacion) {
      // No listeners; esta ruta no muestra Navbar
      setIsAtTop(true);
      return;
    }
    const updateTopFromWindow = () => {
      setIsAtTop(window.scrollY <= 0);
    };

    // Always listen to window scroll
    updateTopFromWindow();
    window.addEventListener('scroll', updateTopFromWindow, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateTopFromWindow);
    };
  }, [pathname, isPresentacion]);

  const navigation = [
    { name: 'Amenidades', href: '/amenidades' },
    { name: 'Etapas', href: '/etapas' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contacto', href: '/contacto' },
  ];

  // La página de presentacion usa su propio header dentro del iframe
  if (isPresentacion) {
    return null;
  }

  return (
    <nav
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isOverlayPage && isAtTop ? 'bg-transparent' : 'bg-white shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            {/* Logo removido hasta obtener el registro en IMPI */}
            {/*
            <Image
              src="/images/balam-glyph.png"
              alt="Logotipo Balam Barabata"
              width={40}
              height={40}
              className={clsx(
                'transition-all duration-300',
                // Oscurecer sobre header blanco para no camuflarse
                isOverlayPage && isAtTop ? '' : 'filter brightness-0 opacity-80'
              )}
            />
            */}
            <Link
              href="/proyecto"
              className={clsx(
                'text-2xl font-bold transition-colors duration-300',
                isOverlayPage && isAtTop ? 'text-white drop-shadow-sm' : 'text-selva'
              )}
            >
              Barabata
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    'px-3 py-2 text-sm font-medium transition-colors duration-200',
                    isOverlayPage && isAtTop ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-selva'
                  )}
                >
                  {item.name}
                </Link>
              ))}
          </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={clsx(
                'inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset transition-colors duration-200',
                isOverlayPage && isAtTop ? 'text-white hover:text-white focus:ring-white/70' : 'text-gray-700 hover:text-selva focus:ring-selva'
              )}
              aria-label="Abrir menú principal"
            >
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={clsx(
        'md:hidden',
        isMenuOpen ? 'block' : 'hidden'
      )}>
        <div
          className={clsx(
            'px-2 pt-2 pb-3 space-y-1',
            isOverlayPage && isAtTop ? 'bg-white/10' : 'bg-white border-t'
          )}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'block px-3 py-2 text-base font-medium transition-colors duration-200',
                isOverlayPage && isAtTop ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-selva'
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
