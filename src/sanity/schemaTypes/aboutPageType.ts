import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Título de la página',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero - Título',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero - Subtítulo',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero - Texto de botón',
      type: 'string',
    }),
    defineField({
      name: 'heroCtaUrl',
      title: 'Hero - URL de botón',
      type: 'url',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero - Imagen',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    }),
    defineField({
      name: 'historyTitle',
      title: 'Historia - Título',
      type: 'string',
    }),
    defineField({
      name: 'historyText',
      title: 'Historia - Texto',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'historyImage',
      title: 'Historia - Imagen',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
        },
      ],
    }),
    defineField({
      name: 'historyRich',
      title: 'Historia - Rich Text',
      type: 'blockContent',
    }),
    defineField({
      name: 'valuesHeading',
      title: 'Valores - Encabezado',
      type: 'string',
    }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Descripción',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'icon',
              title: 'Icono (emoji)',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'finalCtaTitle',
      title: 'CTA final - Título',
      type: 'string',
    }),
    defineField({
      name: 'finalCtaText',
      title: 'CTA final - Texto botón',
      type: 'string',
    }),
    defineField({
      name: 'finalCtaUrl',
      title: 'CTA final - URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'pageTitle',
      subtitle: 'heroTitle',
    },
  },
})
