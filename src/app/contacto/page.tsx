'use client';

import { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    interes: '',
    mensaje: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      setSubmitMessage('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        interes: '',
        mensaje: '',
      });
    } catch (error) {
      setSubmitMessage(`Error: ${error instanceof Error ? error.message : 'No se pudo enviar el mensaje'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero de contacto */}
      <section className="relative py-20 bg-gradient-to-br from-selva/10 to-chukum-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Contacto
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              ¿Listo para formar parte de Balam Barabata? Contáctanos para agendar 
              una visita o resolver todas tus dudas sobre este desarrollo único.
            </p>
          </div>
        </div>
      </section>

      {/* Información de contacto y formulario */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Información de contacto */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Hablemos de tu futuro en la selva
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-chukum-100 rounded-lg flex items-center justify-center mr-4">
                    <PhoneIcon className="w-5 h-5 text-chukum-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Teléfono</h3>
                    <p className="text-gray-600">+52 998 198 1107</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-chukum-100 rounded-lg flex items-center justify-center mr-4">
                    <EnvelopeIcon className="w-5 h-5 text-chukum-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">contacto@balambarabata.page</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-chukum-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPinIcon className="w-5 h-5 text-chukum-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Ubicación</h3>
                    <p className="text-gray-600">12 km del poblado de Uxuxubí y a 1 km del ANP &quot;Felipe Carrillo Puerto&quot;</p>
                    <p className="text-gray-600">Selva Maya en el municipio de Solidaridad, México</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-chukum-100 rounded-lg flex items-center justify-center mr-4">
                    <ClockIcon className="w-5 h-5 text-chukum-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Horarios de Visita</h3>
                    <p className="text-gray-600">Lunes a Viernes: 9:00 - 18:00</p>
                    <p className="text-gray-600">Sábados y Domingos: 9:00 - 15:00</p>
                  </div>
                </div>
              </div>

              {/* Redes sociales */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Síguenos en redes sociales
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/share/1HGHNhMKKB/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/529981981107?text=Hola%20Berne,%20estoy%20interesado%20en%20Balam%20Barabata"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Formulario de contacto */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Solicita información
              </h3>

              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg ${
                  submitMessage.includes('Error') || submitMessage.includes('error')
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-green-50 border border-green-200'
                }`}>
                  <p className={submitMessage.includes('Error') || submitMessage.includes('error')
                    ? 'text-red-700' : 'text-green-700'
                  }>
                    {submitMessage}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chukum-500 focus:border-transparent"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chukum-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chukum-500 focus:border-transparent"
                    placeholder="+52 999 123 4567"
                  />
                </div>

                <div>
                  <label htmlFor="interes" className="block text-sm font-medium text-gray-700 mb-1">
                    Interés principal
                  </label>
                  <select
                    id="interes"
                    name="interes"
                    value={formData.interes}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chukum-500 focus:border-transparent"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="etapa1">Etapa 1 - La Primicia</option>
                    <option value="etapa2">Etapa 2 - Comunidad Sustentable</option>
                    <option value="etapa3">Etapa 3 - Ciudadanos Eco-bio</option>
                    <option value="informacion">Información general</option>
                    <option value="visita">Agendar visita</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-chukum-500 focus:border-transparent resize-none"
                    placeholder="Cuéntanos qué te interesa saber sobre Balam Barabata..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-chukum-600 hover:bg-chukum-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Al enviar este formulario, aceptas recibir comunicaciones de Balam Barabata.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa real */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Nuestra ubicación
            </h2>
            <p className="text-xl text-gray-600">
              En el corazón de la selva yucateca, con fácil acceso desde Mérida y Cancún.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <div className="w-full h-[450px] rounded-lg overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=20.45,-87.31&hl=es&z=14&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Mapa Balam Barabata"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
