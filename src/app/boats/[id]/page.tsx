import { getBoatById } from '@/Services/boatService'
import { notFound } from 'next/navigation'
import BookingForm from '@/components/bookingForms'

export const dynamic = 'force-dynamic'

export default async function BoatDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const boat = await getBoatById(id)

  if (!boat) return notFound()

  const images = boat.gallery || []
  
  console.log('🖼️ Total de imágenes en la galería:', images.length);
  console.log('📋 Estructura de imágenes:', images);
  
  // 1. Identificamos la foto principal
  const mainImage = images.find((img: any) => img.is_main)?.img_url || images[0]?.img_url || boat.image_url
  
  // 2. Filtramos el resto de imágenes, quitando la principal
  const otherImages = images.filter((img: any) => img.img_url !== mainImage).slice(0, 4)
  
  console.log('🎯 Foto principal:', mainImage);
  console.log('🎨 Otras fotos:', otherImages.length);

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Título */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">{boat.name}</h1>
        <p className="text-slate-600">⚓ {boat.boat_type} en Cartagena • 👥 {boat.capacity} personas</p>
      </div>

      {/* GALERÍA DINÁMICA MEJORADA */}
      {images.length > 0 ? (
        <div className={`grid gap-2 overflow-hidden mb-8 rounded-2xl ${
          otherImages.length > 0 ? 'h-[300px] md:h-[450px] grid-cols-1 md:grid-cols-4 grid-rows-2' : 'h-[250px] md:h-[300px] place-items-center'
        }`}>
          {/* Foto Principal: Ocupa 2x2 si hay más fotos, sino ocupe todo */}
          <div className={`${otherImages.length > 0 ? 'md:col-span-2 md:row-span-2' : 'col-span-1 w-full h-full max-h-[80vh]'} relative bg-slate-200`}>
            {mainImage ? (
              <img src={mainImage} className={`w-full h-full ${otherImages.length > 0 ? 'object-contain' : 'object-contain'} hover:opacity-95 transition cursor-pointer`} alt="Principal" />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">Sin foto</div>
            )}
          </div>

          {/* Fotos Secundarias (4 espacios, solo si existen) */}
          {otherImages.map((img: any, index: number) => (
            <div key={img.id} className="hidden md:block bg-slate-100 relative">
              <img src={img.img_url} className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer" alt={`Galería ${index}`} />
            </div>
          ))}

          {/* NO MOSTRAR RELLENO: He borrado los cuadros grises de "Próximamente" para un diseño más limpio */}
        </div>
      ) : (
        <div className="h-[300px] md:h-[450px] bg-slate-100 rounded-2xl mb-8 flex items-center justify-center text-slate-400 border border-slate-200">
          <div className="text-center">
            <span className="text-4xl">📸</span>
            <p className="mt-2 text-sm font-bold uppercase tracking-widest">Sin galería de fotos</p>
          </div>
        </div>
      )}

      {/* Resto de la página (descripción y formulario) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Sobre esta experiencia</h3>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">{boat.description}</p>
          
          <div className="border-t pt-8">
            <h4 className="font-bold mb-4 text-slate-400 uppercase text-xs tracking-widest">Características</h4>
            <div className="flex flex-wrap gap-2">
              {boat.features?.map((f: string) => (
                <span key={f} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
                  ✓ {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-slate-200 shadow-xl p-8 rounded-3xl">
            <div className="mb-6">
              <span className="text-3xl font-bold text-slate-900">${boat.base_price}</span>
              <span className="text-slate-500"> / día</span>
            </div>
            <BookingForm boatId={id} />
          </div>
        </div>
      </div>
    </main>
  )
}