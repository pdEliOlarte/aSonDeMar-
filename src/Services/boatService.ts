import { supabase } from '@/lib/supabase'

export interface Boat {
  id: string;
  name: string;
  slug: { current: string };
  images: any[];
  description: string;
  gallery?: any[];
  image_url?: string;
  base_price?: number;
  capacity?: number;
  boat_type?: string;
  features?: string[];
}

export const getBoatById = async (id: string) => {
  const { data, error } = await supabase
    .from('boats')
    .select(`
      *,
      gallery (*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('❌ Error trayendo boat:', error);
    return null;
  }
  
  console.log('✅ Boat encontrado:', data);
  console.log('📸 Galería:', data?.gallery);
  console.log('📊 Total de fotos en galería:', data?.gallery?.length || 0);
  
  // Forzamos a que sea un objeto JSON plano para evitar errores de serialización
  return JSON.parse(JSON.stringify(data)); 
};

export const getBoats = async (): Promise<Boat[]> => {
  const { data, error } = await supabase
    .from('boats')
    .select(`
      *,
      gallery (*)
    `);

  if (error) return [];
  
  // Forzamos a que sea un objeto JSON plano para evitar errores de serialización
  return JSON.parse(JSON.stringify(data)); 
};