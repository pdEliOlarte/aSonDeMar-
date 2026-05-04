import { supabase } from '@/lib/supabase'

export const getBoats = async () => {
  const { data, error } = await supabase
    .from('boats') // Asegúrate de que tu tabla se llame 'boats'
    .select('*')
  
  if (error) {
    console.error('Error al traer botes:', error)
    return []
  }
  return data
}