import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Balam Barabata - Desarrollo Inmobiliario Regenerativo",
  description: "Vive en armonía con la selva yucateca. Un desarrollo inmobiliario regenerativo que respeta y protege el ecosistema natural.",
  keywords: "desarrollo inmobiliario, Yucatán, sustentable, regenerativo, selva, bienes raíces",
  openGraph: {
    title: "Balam Barabata - Desarrollo Inmobiliario Regenerativo",
    description: "Vive en armonía con la selva yucateca. Un desarrollo inmobiliario regenerativo que respeta y protege el ecosistema natural.",
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
