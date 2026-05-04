"use client"

import { useState } from 'react'
import { createLead } from '@/Services/bookingService'

export default function BookingForm({ boatId }: { boatId: string }) {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    try {
      await createLead({
        boat_id: boatId,
        customer_name: formData.get('customer_name') as string,
        customer_email: formData.get('customer_email') as string,
        customer_phone: formData.get('customer_phone') as string,
        event_date: formData.get('event_date') as string,
        event_time: formData.get('event_time') as string,
        pax: Number(formData.get('pax')),
      })
      setSent(true)
    } catch (err) {
      alert("Hubo un error al enviar tus datos. Revisa la consola.")
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="bg-green-50 p-8 rounded-3xl text-center border border-green-100">
        <span className="text-4xl">⚓</span>
        <h4 className="text-xl font-bold text-green-800 mt-4">¡Reserva Solicitada!</h4>
        <p className="text-green-600 text-sm mt-2">Pronto zarparemos. Un asesor te contactará.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase">Nombre</label>
          <input name="customer_name" required type="text" className="w-full p-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Juan Pérez" />
        </div>
        
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase">Email</label>
          <input name="customer_email" required type="email" className="w-full p-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="juan@ejemplo.com" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">WhatsApp</label>
            <input name="customer_phone" required type="tel" className="w-full p-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="+57..." />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Personas (Pax)</label>
            <input name="pax" required type="number" min="1" className="w-full p-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="4" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Fecha</label>
            <input name="event_date" required type="date" className="w-full p-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase">Hora</label>
            <input name="event_time" type="time" className="w-full p-3 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <button 
        disabled={loading}
        type="submit" 
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg disabled:bg-slate-400"
      >
        {loading ? 'Procesando...' : 'Solicitar Disponibilidad'}
      </button>
    </form>
  )
}