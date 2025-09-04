'use client';

import Link from 'next/link';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function AvisoDePrivacidadPage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-selva/10 to-chukum-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Aviso de Privacidad
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Información detallada sobre el tratamiento, protección y uso responsable de sus datos personales en nuestro sitio web
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">AVISO DE PRIVACIDAD</h2>
              <p className="text-gray-700">
                <strong>Fecha de última actualización:</strong> 4 de septiembre de 2025
              </p>
            </div>

            <div className="space-y-8">
              <p className="text-gray-700 leading-relaxed">
                De conformidad con lo dispuesto en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (en adelante &ldquo;la Ley&rdquo;), <strong>Balam Barabata S.A. de C.V.</strong> (en adelante &ldquo;BALAM BARABATA&rdquo;), con domicilio fiscal en Avenida Bonampak, Supermanzana 6, Cancún, Quintana Roo, C.P. 77500, es el responsable del uso y protección de sus datos personales, y al respecto le informamos lo siguiente:
              </p>

              <div className="bg-white border-l-4 border-chukum-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Para qué fines utilizaremos sus datos personales?</h4>
                
                <p className="text-gray-700 mb-4">
                  Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:
                </p>
                
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 mb-2">Finalidades Primarias:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                    <li>Identificarle y contactarle para dar seguimiento a su solicitud de información sobre el proyecto inmobiliario Balam Barabata.</li>
                    <li>Proporcionarle la información detallada sobre las etapas de inversión, precios, planes y características del desarrollo.</li>
                    <li>Agendar reuniones, llamadas o visitas al proyecto.</li>
                    <li>Gestionar el proceso de apartado, inversión y formalización de contratos relacionados con la adquisición de un lote.</li>
                    <li>Cumplir con las obligaciones legales y contractuales derivadas de la relación con usted.</li>
                  </ul>
                </div>

                <p className="text-gray-700 mb-4">
                  De manera adicional, utilizaremos su información personal para las siguientes <strong>finalidades secundarias</strong> que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Enviarle comunicaciones sobre futuras etapas, nuevos proyectos, promociones y eventos especiales.</li>
                  <li>Realizar encuestas de calidad en el servicio.</li>
                  <li>Fines de mercadotecnia, publicidad o prospección comercial.</li>
                </ul>

                <p className="text-gray-700 mt-4">
                  En caso de que no desee que sus datos personales sean tratados para estos fines secundarios, desde este momento usted nos puede comunicar lo anterior a través del siguiente mecanismo: Enviando un correo electrónico a <strong>privacidad@balambarabata.page</strong> manifestando su negativa.
                </p>
              </div>

              <div className="bg-white border-l-4 border-selva pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Qué datos personales utilizaremos para estos fines?</h4>
                
                <p className="text-gray-700 mb-4">
                  Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Datos de identificación y contacto: Nombre completo, correo electrónico, número de teléfono.</li>
                  <li>Datos que usted proporcione voluntariamente en el mensaje de contacto.</li>
                </ul>
              </div>

              <div className="bg-white border-l-4 border-chukum-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Con quién compartimos su información personal y para qué fines?</h4>
                
                <p className="text-gray-700 mb-4">
                  Le informamos que sus datos personales podrán ser compartidos dentro y fuera del país con las siguientes personas, empresas, organizaciones o autoridades distintas a nosotros, para los siguientes fines:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Notarías Públicas:</strong> Para la formalización de contratos de fideicomiso y escrituración.</li>
                  <li><strong>Instituciones Financieras:</strong> En caso de que se requiera para la gestión de pagos o créditos.</li>
                  <li><strong>Asesores legales y contables:</strong> Para el cumplimiento de obligaciones contractuales y fiscales.</li>
                </ul>
                
                <p className="text-gray-700 mt-4">
                  Nos comprometemos a no transferir su información personal a terceros sin su consentimiento, salvo las excepciones previstas en el artículo 37 de la Ley.
                </p>
              </div>

              <div className="bg-white border-l-4 border-selva pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso (Derechos ARCO)?</h4>
                
                <p className="text-gray-700 mb-4">
                  Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (&ldquo;Acceso&rdquo;). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (&ldquo;Rectificación&rdquo;); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (&ldquo;Cancelación&rdquo;); así como oponerse al uso de sus datos personales para fines específicos (&ldquo;Oposición&rdquo;). Estos derechos se conocen como derechos ARCO.
                </p>
                
                <p className="text-gray-700">
                  Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través de un correo electrónico a: <strong>privacidad@balambarabata.page</strong>.
                </p>
              </div>

              <div className="bg-white border-l-4 border-chukum-500 pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Uso de Cookies y Web Beacons</h4>
                
                <p className="text-gray-700">
                  Le informamos que en nuestra página de internet utilizamos cookies, web beacons u otras tecnologías, a través de las cuales es posible monitorear su comportamiento como usuario de internet, así como brindarle un mejor servicio y experiencia al navegar en nuestra página. Los datos personales que obtenemos de estas tecnologías de rastreo son anónimos y se utilizan para fines estadísticos.
                </p>
              </div>

              <div className="bg-white border-l-4 border-selva pl-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">¿Cómo puede conocer los cambios en este aviso de privacidad?</h4>
                
                <p className="text-gray-700">
                  El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; o por otras causas. Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a través de su publicación en nuestro sitio web: <strong>https://www.balambarabata.page/aviso-de-privacidad</strong>.
                </p>
                
                <p className="text-gray-700 mt-4">
                  Al proporcionar sus datos personales a través de nuestro sitio web, usted consiente el tratamiento de su información de conformidad con los términos de este &ldquo;Aviso de Privacidad&rdquo;.
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                ¿Tienes dudas sobre el manejo de tus datos?
              </h3>
              <p className="text-gray-600 mb-6">
                Contáctanos para resolver cualquier pregunta sobre nuestro aviso de privacidad
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
          </div>
        </div>
      </section>
    </div>
  );
}
