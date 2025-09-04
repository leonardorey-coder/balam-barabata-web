'use client';

import Link from 'next/link';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function TerminosYCondicionesPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-selva/10 to-chukum-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Términos y Condiciones de Uso
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Condiciones generales que regulan el uso de nuestro sitio web y los derechos y responsabilidades de los usuarios
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-600 hover:text-chukum-600 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">TÉRMINOS Y CONDICIONES DE USO</h2>
              <p className="text-gray-700">
                <strong>Fecha de última actualización:</strong> 4 de septiembre de 2025
              </p>
            </div>

            <div className="space-y-8">
              <p className="text-gray-700 leading-relaxed">
                Bienvenido al sitio web oficial de Balam Barabata (https://www.balambarabata.page/). A continuación, se describen los términos y condiciones que rigen el uso de este sitio web (en adelante, el &ldquo;Sitio&rdquo;). Al acceder y utilizar el Sitio, usted (en adelante, el &ldquo;Usuario&rdquo;) acepta y se obliga a cumplir con los presentes Términos y Condiciones.
              </p>

              <div className="bg-white border-l-4 border-chukum-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">1. Objeto del Sitio</h4>
                <p className="text-gray-700">
                  El Sitio tiene como finalidad principal la presentación, promoción y difusión de información relativa al proyecto inmobiliario &ldquo;Balam Barabata&rdquo;, incluyendo sus características, concepto, etapas de desarrollo, precios y formas de contacto. La información aquí contenida es de carácter puramente informativo.
                </p>
              </div>

              <div className="bg-white border-l-4 border-selva pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">2. Propiedad Intelectual</h4>
                <p className="text-gray-700">
                  Todo el contenido publicado en el Sitio, incluyendo, pero no limitado a, textos, gráficos, logotipos, iconos, imágenes, renders, videos, y el diseño del sitio, es propiedad exclusiva de <strong>Balam Barabata S.A. de C.V.</strong> (&ldquo;BALAM BARABATA&rdquo;) o de sus licenciantes, y está protegido por las leyes de propiedad intelectual y derechos de autor de México y tratados internacionales. Queda estrictamente prohibida la reproducción, distribución, modificación o uso de dicho contenido sin el consentimiento previo y por escrito de BALAM BARABATA.
                </p>
              </div>

              <div className="bg-white border-l-4 border-chukum-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">3. Uso del Sitio</h4>
                <p className="text-gray-700 mb-4">
                  El Usuario se compromete a utilizar el Sitio de manera lícita y de acuerdo con los presentes Términos y Condiciones. El Usuario debe ser mayor de edad (18 años) y tener capacidad legal para obligarse. El Usuario se abstendrá de:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Utilizar el Sitio con fines ilícitos o que puedan dañar, sobrecargar o deteriorar el Sitio o los derechos de terceros.</li>
                  <li>Intentar obtener acceso no autorizado a cualquier parte del Sitio o a los sistemas o redes conectadas al mismo.</li>
                  <li>Introducir virus informáticos o cualquier otro código malicioso que pueda causar daños al Sitio.</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-selva pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">4. Información del Proyecto y Limitación de Responsabilidad</h4>
                <p className="text-gray-700 mb-4">
                  La información presentada en el Sitio, como precios, disponibilidad, planes maestros, renders, amenidades y fechas de entrega, es de carácter ilustrativo y preliminar. &ldquo;BALAM BARABATA&rdquo; se reserva el derecho de modificar dicha información en cualquier momento y sin previo aviso.
                </p>
                <p className="text-gray-700 mb-4">
                  La información del Sitio no constituye una oferta formal de venta ni un contrato. Cualquier operación de inversión o compraventa se formalizará exclusivamente a través de los instrumentos legales correspondientes (contrato de fideicomiso, contrato de promesa de compraventa, etc.), los cuales serán proporcionados y firmados por las partes interesadas fuera de este Sitio.
                </p>
                <p className="text-gray-700">
                  BALAM BARABATA no se hace responsable por interrupciones en el servicio del Sitio, errores, omisiones, ni por los daños que pudieran derivarse del uso del mismo.
                </p>
              </div>

              <div className="bg-white border-l-4 border-chukum-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">5. Enlaces a Terceros</h4>
                <p className="text-gray-700">
                  El Sitio puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan únicamente para la conveniencia del Usuario. BALAM BARABATA no tiene control sobre dichos sitios y no es responsable de su contenido ni de sus prácticas de privacidad.
                </p>
              </div>

              <div className="bg-white border-l-4 border-selva pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">6. Modificaciones a los Términos y Condiciones</h4>
                <p className="text-gray-700">
                  BALAM BARABATA se reserva el derecho de modificar los presentes Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor a partir de su publicación en el Sitio. Es responsabilidad del Usuario revisar periódicamente esta página para estar al tanto de las actualizaciones.
                </p>
              </div>

              <div className="bg-white border-l-4 border-chukum-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">7. Ley Aplicable y Jurisdicción</h4>
                <p className="text-gray-700">
                  Para la interpretación y cumplimiento de los presentes Términos y Condiciones, el Usuario y &ldquo;BALAM BARABATA&rdquo; se someten expresamente a las leyes federales de los Estados Unidos Mexicanos y a la jurisdicción de los tribunales competentes de la ciudad de Cancún, Quintana Roo, renunciando a cualquier otro fuero que por razón de sus domicilios presentes o futuros pudiera corresponderles.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Contacto</h4>
                <p className="text-gray-700 mb-2">
                  Para cualquier consulta relacionada con estos Términos y Condiciones, puede contactarnos en:
                </p>
                <div className="space-y-1 text-gray-700">
                  <p><strong>Email:</strong> contacto@balambarabata.page</p>
                  <p><strong>Teléfono:</strong> +52 998 198 1107</p>
                  <p><strong>Sitio web:</strong> https://www.balambarabata.page</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ¿Tienes dudas sobre estos términos?
              </h3>
              <p className="text-gray-600 mb-6">
                Nuestro equipo está disponible para resolver cualquier consulta
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contacto"
                  className="inline-flex items-center px-6 py-3 bg-chukum-600 text-white font-medium rounded-lg hover:bg-chukum-700 transition-colors duration-200"
                >
                  Contactar
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                >
                  <HomeIcon className="w-5 h-5 mr-2" />
                  Volver al inicio
                </Link>
              </div>
            </div>

            {/* Additional Navigation */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Documentos relacionados</h4>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/aviso-de-privacidad"
                  className="text-chukum-600 hover:text-chukum-700 transition-colors"
                >
                  Aviso de Privacidad
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/faq"
                  className="text-chukum-600 hover:text-chukum-700 transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/proyecto"
                  className="text-chukum-600 hover:text-chukum-700 transition-colors"
                >
                  Conocer el Proyecto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
