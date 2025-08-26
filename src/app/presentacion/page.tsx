import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Presentación | Balam Barabata - Inversión Inmobiliaria',
  description: 'Presentación completa del proyecto Balam Barabata en Uxuxubi, Quintana Roo.',
};

export default function PresentacionPage() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/presentacion/index.html"
        id="presentacion-iframe"
        className="w-full h-full border-0"
        title="Presentación Balam Barabata"
        allow="fullscreen"
      />
    </div>
  );
}
