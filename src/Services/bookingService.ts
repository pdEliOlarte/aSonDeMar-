import { supabase } from '@/lib/supabase'

export const createLead = async (leadData: { 
  boat_id: string, 
  customer_name: string, 
  customer_email: string,
  customer_phone: string, 
  event_date: string,
  event_time?: string,
  pax?: number
  status?: string
}) => {
  const { data, error } = await supabase
    .from('lead_bookings')
    .insert([leadData])
    .select()

  if (error) {
    console.error('Error guardando el lead:', error)
    throw error
  }
  return data
}

export const getLeads = async ()=>{
  const { data, error } = await supabase
    .from('lead_bookings')
    .select(`*
      , boat:boats (
        id, name
      )
        where booking_status = 'pending' or booking_status = 'contacted'
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching leads:', error)
    throw error
  }
  return JSON.parse(JSON.stringify(data)) // Forzamos a que sea un objeto JSON plano para evitar errores de serialización 
}

export const updateLeadStatus = async (id: number, status: string) => {
  const { data, error } = await supabase
    .from('lead_bookings')
    .update({ booking_status: status })
    .eq('id', id)
    .select()

  if (error) {
    console.error('Error updating lead status:', error)
    throw error
  }

  return JSON.parse(JSON.stringify(data))
}