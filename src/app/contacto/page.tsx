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
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        interes: '',
        mensaje: '',
      });
    }, 1500);
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
                    <p className="text-gray-600">+52 999 123 4567</p>
                    <p className="text-gray-600">+52 999 765 4321</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-chukum-100 rounded-lg flex items-center justify-center mr-4">
                    <EnvelopeIcon className="w-5 h-5 text-chukum-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@balambarabata.com</p>
                    <p className="text-gray-600">ventas@balambarabata.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-chukum-100 rounded-lg flex items-center justify-center mr-4">
                    <MapPinIcon className="w-5 h-5 text-chukum-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Ubicación</h3>
                    <p className="text-gray-600">Carretera Mérida-Cancún Km 85</p>
                    <p className="text-gray-600">Selva de Yucatán, México</p>
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
                    href="#"
                    className="w-10 h-10 bg-selva rounded-lg flex items-center justify-center text-white hover:bg-selva/80 transition-colors"
                    aria-label="Facebook"
                  >
                    F
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-selva rounded-lg flex items-center justify-center text-white hover:bg-selva/80 transition-colors"
                    aria-label="Instagram"
                  >
                    IG
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-selva rounded-lg flex items-center justify-center text-white hover:bg-selva/80 transition-colors"
                    aria-label="WhatsApp"
                  >
                    WA
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
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700">{submitMessage}</p>
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

      {/* Mapa conceptual */}
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

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-selva rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Mapa interactivo próximamente
                </p>
                <p className="text-gray-600">
                  Carretera Mérida-Cancún Km 85
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
