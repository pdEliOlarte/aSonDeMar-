export default {
  name: 'boat',
  title: 'Botes',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre del Bote',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'URL Amigable (Slug)',
      type: 'slug',
      options: { source: 'name' }
    },
    {
      name: 'images',
      title: 'Galería de Fotos',
      type: 'array',
      of: [{ type: 'image' }],
      options: { layout: 'grid' }
    },
    {
      name: 'description',
      title: 'Descripción Detallada',
      type: 'text',
    },
  ],
}