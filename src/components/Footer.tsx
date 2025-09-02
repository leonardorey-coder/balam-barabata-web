"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const isPresentacion = pathname?.startsWith('/presentacion');
  const isProjectRoute = (
    pathname === '/proyecto' ||
    pathname?.startsWith('/amenidades') ||
    pathname?.startsWith('/etapas') ||
    pathname?.startsWith('/contacto')
  );

  // No mostrar footer en la presentación embebida
  if (isPresentacion) return null;

  return (
    <footer className="bg-selva text-white">
      <div className="max-w-7xl mx-auto py-6 md:py-8 px-4 sm:px-6 lg:px-8">
        {/* Bloque superior "Únete a nosotros" oculto en rutas del proyecto para evitar duplicado con CallToAction */}
        {!isProjectRoute && (
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Únete a nosotros
            </h2>
            <p className="mt-2 text-base sm:text-lg text-chukum-200 max-w-2xl mx-auto">
              Sé parte de un proyecto que conserva el&nbsp;<strong>70&nbsp;%</strong> de su área
              natural para las generaciones futuras.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3">Balam Barabata</h3>
            <p className="text-sm sm:text-base text-gray-300 mb-4">
              Desarrollo inmobiliario regenerativo en el corazón de la selva maya.
            </p>
            <p className="text-sm text-gray-400">
              Comprometidos con la sustentabilidad y el respeto por la naturaleza.
            </p>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-semibold mb-3">Navegación</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/presentacion" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/proyecto" className="text-gray-300 hover:text-white transition-colors">
                  Proyecto
                </Link>
              </li>
              <li>
                <Link href="/amenidades" className="text-gray-300 hover:text-white transition-colors">
                  Amenidades
                </Link>
              </li>
              <li>
                <Link href="/etapas" className="text-gray-300 hover:text-white transition-colors">
                  Etapas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-semibold mb-3">Contacto</h4>
            <div className="space-y-2 text-gray-300">
              <p>📍 12 km del poblado de Uxuxubí y a 1 km del ANP &quot;Felipe Carrillo Puerto&quot;, Selva de Yucatán, México</p>
              <p>📞 +52 998 198 1107</p>
              <p>✉️ contacto@balambarabata.page</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                Síguenos en redes sociales
              </p>
              <div className="flex space-x-4 mt-2">
                <a href="https://www.facebook.com/share/1HGHNhMKKB/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                  Facebook
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                  Instagram
                </a>
                <a href="https://wa.me/529981981107?text=Hola%20Berne,%20estoy%20interesado%20en%20Balam%20Barabata" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors" aria-label="WhatsApp">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Balam Barabata. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0">
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors mr-6">
                Aviso de Privacidad
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
