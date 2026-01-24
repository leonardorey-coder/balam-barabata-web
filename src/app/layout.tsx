import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/chatbot/ChatBot';


export const metadata: Metadata = {
  title: "Balam Barabata - Desarrollo Inmobiliario Regenerativo",
  description: "Vive en armonía con la selva yucateca. Un desarrollo inmobiliario regenerativo que respeta y protege el ecosistema natural.",
  keywords: "desarrollo inmobiliario, Yucatán, sustentable, regenerativo, selva, bienes raíces, desarrollo inmobiliario en Cancun, proyecto inversion Cancun, venta de terreno Cancun, lotes en venta Cancun, inversion inmobiliaria Riviera Maya, desarrollo sustentable Cancun, lotes residenciales Quintana Roo, inversion en terrenos Cancun, proyecto inmobiliario Cancun, terrenos residenciales Cancun, preventa lotes Cancun, desarrollo inmobiliario Quintana Roo, plusvalia Cancun, inversion en la Riviera Maya",
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
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ChatBot />
      </body>
    </html>
  );
}
