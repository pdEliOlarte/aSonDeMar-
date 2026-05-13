import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'TU_PROJECT_ID_AQUI', // Lo verás al crear el proyecto en Sanity
  dataset: 'production',
  apiVersion: '2024-05-04',
  useCdn: false,
})

const builder = imageUrlBuilder(client)
export function urlFor(source: any) {
  return builder.image(source)
}