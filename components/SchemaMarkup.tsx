import Script from 'next/script'

export default function SchemaMarkup() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pursuing Christ",
    "url": "https://www.pursuingchrist.space",
    "logo": "https://www.pursuingchrist.space/logo.png",
    "description": "An online Christian ministry dedicated to faith, purpose, and discipleship.",
    "founder": {
      "@type": "Person",
      "name": "Pursuing Christ"
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pursuing Christ",
    "url": "https://www.pursuingchrist.space",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.pursuingchrist.space/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <Script id="organization-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} strategy="afterInteractive" />
      <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} strategy="afterInteractive" />
    </>
  )
}
