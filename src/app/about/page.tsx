import { client, urlFor } from '../../lib/sanity'

function renderBlockContent(blocks: any[] = []) {
  return blocks.map((block, index) => {
    if (block?._type !== 'block' || !block.children) return null

    const text = block.children.map((child: any) => child.text || '').join('')
    const style = block.style || 'normal'

    switch (style) {
      case 'h1':
        return (
          <h1 key={index} className="text-4xl font-bold mb-4">
            {text}
          </h1>
        )
      case 'h2':
        return (
          <h2 key={index} className="text-3xl font-bold mb-4">
            {text}
          </h2>
        )
      case 'h3':
        return (
          <h3 key={index} className="text-2xl font-bold mb-4">
            {text}
          </h3>
        )
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-slate-300 pl-4 italic text-slate-700 mb-4">
            {text}
          </blockquote>
        )
      default:
        return (
          <p key={index} className="text-slate-600 leading-relaxed mb-4">
            {text}
          </p>
        )
    }
  })
}

export default async function AboutPage() {
  const query = `*[_type == "aboutPage"][0]{
    pageTitle,
    heroTitle,
    heroSubtitle,
    heroCtaText,
    heroCtaUrl,
    heroImage,
    historyTitle,
    historyText,
    historyRich,
    historyImage,
    values[]{title, description, icon},
    finalCtaTitle,
    finalCtaText,
    finalCtaUrl
  }`

  const data = await client.fetch(query)

  if (!data) {
    return (
      <main className="py-20 px-6">
        <p className="text-center">Contenido de About no disponible aún.</p>
      </main>
    )
  }

  const heroBg = data.heroImage ? urlFor(data.heroImage).url() : null

  return (
    <main className="bg-white">
      <section className="relative h-[60vh] flex items-center justify-center bg-blue-900 text-white">
        {heroBg ? (
          <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{backgroundImage: `url(${heroBg})`}} />
        ) : (
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1567891299675-c39385567378?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40" />
        )}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">{data.heroTitle || data.pageTitle || 'Nuestra Pasión es el Mar'}</h1>
          {data.heroSubtitle && <p className="text-xl md:text-2xl max-w-2xl mx-auto font-light">{data.heroSubtitle}</p>}
          {data.heroCtaText && (
            <div className="mt-6">
              <a href={data.heroCtaUrl || '/'} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                {data.heroCtaText}
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-6">{data.historyTitle || '¿Qué es aSonDeMar?'}</h2>
            {data.historyText && <p className="text-slate-600 leading-relaxed mb-4">{data.historyText}</p>}
            {data.historyRich && <div className="mb-4">{renderBlockContent(data.historyRich)}</div>}
          </div>
          <div className="bg-slate-100 h-80 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center text-slate-400">
            {data.historyImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={urlFor(data.historyImage).width(1200).url()} alt={(data.historyImage?.alt) || 'Historia'} className="object-cover w-full h-full" />
            ) : (
              <div className="p-6">[ Foto del equipo o de un bote navegando ]</div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800">{data.valuesHeading || '¿Por qué confiar en nosotros?'}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {(data.values || []).map((item: any, index: number) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:translate-y-[-5px] transition-transform">
                <div className="text-4xl mb-4">{item.icon || '⚓'}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">{data.finalCtaTitle || '¿Listo para zarpar?'}</h2>
        <a href={data.finalCtaUrl || '/'} className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg inline-block">
          {data.finalCtaText || 'Explorar la Flota'}
        </a>
      </section>
    </main>
  )
}