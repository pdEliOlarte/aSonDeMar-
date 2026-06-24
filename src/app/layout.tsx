import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link"; // Importante para navegar sin recargar la página

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "cartagena boats hospitality | Renta de Botes",
  description: "Tu marketplace náutico de confianza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* --- NAVBAR --- */}
        <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 sticky top-0 z-50">
          <Link href="/" className="text-2xl font-bold text-blue-900 flex items-center gap-2">
            ⚓ <span className="hidden md:inline">cartagena boats hospitality</span>
          </Link>
          
          <div className="flex gap-6 items-center font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition">Botes</Link>
            <Link href="/about" className="hover:text-blue-600 transition">Nosotros</Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
              Contacto
            </button>
          </div>
        </nav>

        {/* --- CONTENIDO DE LAS PÁGINAS --- */}
        {children}

        {/* --- FOOTER (Opcional) --- */}
        <footer className="py-10 text-center border-t border-slate-100 text-slate-400 text-sm">
          © {new Date().getFullYear()} cartagena boats hospitality - Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}