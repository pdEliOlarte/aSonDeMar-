import { supabase } from '@/lib/supabase'

export const createLead = async (leadData: { 
  boat_id: string, 
  customer_name: string, 
  customer_email: string,
  customer_phone: string, 
  event_date: string,
  event_time?: string,
  pax?: number
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