import { getBoatById } from '@/Services/boatService'
import { notFound } from 'next/navigation'
import BookingForm from '@/components/bookingForms'

export const dynamic = 'force-dynamic'

export default async function BoatDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const boat = await getBoatById(id)

  if (!boat) return notFound()

  // Separamos la foto principal de las demás
  const mainImage = boat.gallery?.find((img: any) => img.is_main)?.img_url || boat.gallery[0]?.img_url
  const otherImages = boat.gallery?.filter((img: any) => img.img_url !== mainImage).slice(0, 4)

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Título y Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">{boat.name}</h1>
        <p className="text-slate-600">⚓ {boat.boat_type} en Cartagena • 👥 {boat.capacity} personas</p>
      </div>

      {/* GALERÍA ESTILO AIRBNB */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[450px] rounded-2xl overflow-hidden mb-8">
        {/* Foto Principal (Ocupa 2x2) */}
        <div className="md:col-span-2 md:row-span-2 relative bg-slate-200">
          {mainImage ? (
            <img src={mainImage} className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" alt="Principal" />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400">Sin foto</div>
          )}
        </div>

        {/* Fotos Secundarias (4 espacios) */}
        {otherImages?.map((img: any, index: number) => (
          <div key={img.id} className="hidden md:block bg-slate-200 relative">
            <img src={img.img_url} className="w-full h-full object-cover hover:opacity-90 transition cursor-pointer" alt={`Gallery ${index}`} />
          </div>
        ))}
        
        {/* Relleno si faltan fotos */}
        {(!otherImages || otherImages.length < 4) && Array.from({ length: 4 - (otherImages?.length || 0) }).map((_, i) => (
          <div key={i} className="hidden md:flex items-center justify-center bg-slate-100 text-slate-300 text-xs uppercase font-bold">
            Próximamente
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Descripción</h3>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">{boat.description}</p>
          
          <div className="border-t pt-8">
            <h4 className="font-bold mb-4">Características</h4>
            <div className="flex flex-wrap gap-2">
              {boat.features?.map((f: string) => (
                <span key={f} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  ✓ {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Formulario Sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-slate-200 shadow-xl p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-slate-900">${boat.base_price}</span>
              <span className="text-slate-500">/ día</span>
            </div>
            <BookingForm boatId={id} />
          </div>
        </div>
      </div>
    </main>
  )
}
