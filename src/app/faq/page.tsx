'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { HomeIcon, PhoneIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // General
  {
    category: "General",
    question: "¿Qué es Balam Barabata?",
    answer: "Es un desarrollo residencial sustentable y regenerativo en la selva de Quintana Roo, enfocado en el bienestar, la naturaleza y el legado."
  },
  {
    category: "General",
    question: "¿Cómo se garantiza la sustentabilidad y la conservación?",
    answer: "Mediante la conservación del 70% de cada lote, uso de materiales regionales, energía renovable, tratamiento de aguas, vegetación nativa y certificaciones ambientales."
  },
  {
    category: "General",
    question: "¿Puedo construir cualquier tipo de casa?",
    answer: "Solo modelos de casa maya autorizados, con arquitectura bioclimática y materiales sustentables."
  },
  {
    category: "General",
    question: "¿Qué beneficios tiene invertir en la etapa de fundadores?",
    answer: "Precios exclusivos, acceso a amenidades privadas (alberca y temazcal), prioridad de selección de lote y beneficios escalonados."
  },
  {
    category: "General",
    question: "¿Qué amenidades incluye el desarrollo?",
    answer: "Spa, cenote privado, casa club, huertos, meliponario, plaza central, área comercial con restaurante y cafetería, gimnasio, centro de negocios, etc."
  },
  {
    category: "General",
    question: "¿Qué es el ADVC?",
    answer: "Es un Área Destinada Voluntariamente a la Conservación, certificada por la CONANP y SEMARNAT, destinada a preservar flora y fauna endémicas."
  },
  
  // Inversión y precios
  {
    category: "Inversión y precios",
    question: "¿Cuáles son los precios y cómo funcionan las etapas?",
    answer: "Etapa 1 (fundadores): 40 lotes con descuento exclusivo, amenidades privadas. Etapa 2: 80 lotes, precio diferido, acceso a ecoparque. Etapa 3: 80 lotes, precio regular, cercanos a área comercial. Precios escalonados: los primeros lotes tienen mayor descuento y beneficios."
  },
  {
    category: "Inversión y precios",
    question: "¿Qué certeza jurídica ofrecen?",
    answer: "Todos los lotes están bajo fideicomiso condominal, con escrituras y procesos legales claros."
  },
  {
    category: "Inversión y precios",
    question: "¿Puedo transferir mi lote o venderlo a futuro?",
    answer: "Sí, puedes transferirlo cumpliendo las reglas del régimen y previa autorización de la administración."
  },
  
  // Comunidad y vida diaria
  {
    category: "Comunidad y vida diaria",
    question: "¿Puedo tener mascotas?",
    answer: "Solo en los lotes privados, no en áreas comunes, para proteger el ecosistema."
  },
  {
    category: "Comunidad y vida diaria",
    question: "¿El desarrollo es accesible para personas con discapacidad?",
    answer: "Sí, cuenta con accesibilidad universal: rampas, señalética braille, pasillos amplios, sanitarios adaptados."
  },
  {
    category: "Comunidad y vida diaria",
    question: "¿Qué servicios de seguridad hay?",
    answer: "Caseta de acceso, barda perimetral, administración centralizada."
  },
  {
    category: "Comunidad y vida diaria",
    question: "¿Hay actividades, talleres o eventos para residentes?",
    answer: "Sí, talleres de bienestar, educación ambiental, eventos comunitarios y culturales."
  },
  
  // Contacto y más información
  {
    category: "Contacto y más información",
    question: "¿Cómo puedo agendar una visita o webinar informativo?",
    answer: "Solicítalo a través de la página de contacto o inscríbete a los eventos disponibles."
  },
  {
    category: "Contacto y más información",
    question: "¿Dónde puedo ver el master plan y renders?",
    answer: "Consulta el mapa interactivo y galería, información del proyecto y las etapas disponibles en la web oficial."
  },
  {
    category: "Contacto y más información",
    question: "¿Qué beneficios puedo obtener invitando a otras personas?",
    answer: "Puedes recibir descuentos, amenidades exclusivas o reconocimientos como fundador si tus referidos adquieren un lote."
  }
];

interface FAQAccordionProps {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}

function FAQAccordion({ item, isOpen, onClick }: FAQAccordionProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
      >
        <span className="font-medium text-gray-900">{item.question}</span>
        {isOpen ? (
          <ChevronUpIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white">
          <p className="text-gray-700 leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQs = selectedCategory === 'Todas' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              Encuentra respuestas a las preguntas más comunes sobre Balam Barabata
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <FAQAccordion
              key={index}
              item={item}
              isOpen={openItems.has(index)}
              onClick={() => toggleItem(index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Tienes más dudas?
          </h3>
          <p className="text-gray-600 mb-6">
            Nuestro equipo está listo para ayudarte con cualquier pregunta adicional
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <PhoneIcon className="w-5 h-5 mr-2" />
              Contáctanos
            </Link>
            <Link
              href="/amenidades"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Ver Amenidades
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/" className="flex items-center text-gray-600 hover:text-green-600 transition-colors">
            <HomeIcon className="w-4 h-4 mr-1" />
            Página Principal
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/amenidades" className="text-gray-600 hover:text-green-600 transition-colors">
            Ver Amenidades
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/proyecto" className="text-gray-600 hover:text-green-600 transition-colors">
            Conocer el Proyecto
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/etapas" className="text-gray-600 hover:text-green-600 transition-colors">
            Consultar Etapas
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}
