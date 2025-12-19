import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({ title, description, image, url, type = 'website', schema }) => {
  const siteTitle = 'Pahnawa Banaras | Authentic Heritage Silks';
  const metaTitle = title ? `${title} | Pahnawa Banaras` : siteTitle;
  const metaDesc = description || 'Shop authentic handwoven Banarasi sarees, bridal lehengas, and pure silk fabrics directly from Varanasi master weavers. Certified Silk Mark quality.';
  const metaImage = image || 'https://pahnawabanaras.com/og-image.jpg'; 
  const metaUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDesc} />
      <meta property="twitter:image" content={metaImage} />

      {/* Structured Data (JSON-LD) for Google Rich Results */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};