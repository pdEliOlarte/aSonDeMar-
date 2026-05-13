import { supabase } from '@/lib/supabase'

export const getBoatById = async (id: string) => {
  const { data, error } = await supabase
    .from('boats')
    .select(`
      *,
      gallery (*) 
    `) // Esto trae el barco y todas sus filas en la tabla gallery
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}