import { getBoats, Boat } from '@/Services/boatService'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const boats = await getBoats()

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-blue-900">⚓ A SonDeMar Boats Hospitality</h1>
        <p className="text-slate-600 mt-2">Explora las mejores experiencias náuticas</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {boats?.map((boat: Boat) => (
          <div key={boat.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 hover:shadow-xl transition">
            <div className="h-48 w-full relative bg-slate-200">
              {/* Aquí intentamos sacar la imagen principal de la galería o el image_url viejo */}
              {boat.image_url ? (
                <img src={boat.image_url} alt={boat.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">Sin Imagen</div>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800">{boat.name}</h2>
              <p className="text-slate-500 text-sm mt-1 line-clamp-2">{boat.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-blue-600 font-bold">${boat.base_price} / día</span>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">Cap: {boat.capacity}</span>
              </div>
              <Link href={`/boats/${boat.id}`} className="block mt-6">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                  Ver detalles
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {boats?.length === 0 && (
        <div className="text-center p-20 border-2 border-dashed rounded-3xl border-slate-200 mt-10">
          <p className="text-slate-400">No hay botes disponibles por ahora.</p>
        </div>
      )}
    </main>
  )
}