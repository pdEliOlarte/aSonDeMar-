import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import BookingForm from '@/components/bookingForms'
/*export default async function BoatDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
})
*/

export const dynamic = 'force-dynamic' // <--- Línea clave
export default async function BoatDetail({ params }: { params: Promise<{ id: string }> }) {
  // 1. Traemos los datos del bote específico desde Supabase
  const { id } = await params
  const { data: boat, error } = await supabase
    .from('boats')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !boat) return notFound()

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* COLUMNA IZQUIERDA: Info del Bote */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">{boat.name}</h1>
          <div className="flex gap-4 mb-6 text-sm font-medium text-blue-600">
            <span>⚓ {boat.boat_type || 'Embarcación'}</span>
            <span>👥 Capacidad: {boat.capacity} personas</span>
          </div>
          <div className="h-48 w-full relative overflow-hidden">
              {boat.image_url ? (
              <img 
              src={boat.image_url} 
              alt={boat.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"/>
  ) : (
    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
      Sin imagen
    </div>
  )}
</div>
          <div className="aspect-video bg-slate-200 rounded-3xl mb-8 flex items-center justify-center text-slate-400 overflow-hidden shadow-inner">
            {/* Aquí conectaremos el Storage de fotos pronto */}
            p
          </div>

          <h3 className="text-2xl font-bold text-slate-800 mb-4">Sobre esta experiencia</h3>
          <p className="text-slate-600 leading-relaxed text-lg mb-8">
            {boat.description}
          </p>
          
          <div className="grid grid-cols-2 gap-4 border-t pt-8">
            <div className="p-4 bg-slate-50 rounded-xl">
              <span className="block text-xs uppercase tracking-wider text-slate-400 font-bold">Precio base</span>
              <span className="text-2xl font-bold text-blue-900">${boat.base_price} / día</span>
            </div>
          </div>
        </div>
        
        {/* COLUMNA DERECHA: Formulario de Reserva (Sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-slate-100 shadow-2xl p-8 rounded-3xl">
            <h4 className="text-xl font-bold mb-6 text-slate-800">Solicitar Reserva</h4>
            <BookingForm boatId={id} />
             
            <p className="text-[10px] text-center text-slate-400 mt-4 px-4 uppercase">
              No se te cobrará nada aún. Un asesor te contactará para confirmar.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

/**
 <form className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Nombre Completo</label>
                <input type="text" className="w-full p-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Ej: Juan Pérez" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">WhatsApp / Celular</label>
                <input type="tel" className="w-full p-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="+57 ..." />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase">Fecha deseada</label>
                <input type="date" className="w-full p-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <button type="button" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                Enviar Solicitud
              </button>
            </form>
 */