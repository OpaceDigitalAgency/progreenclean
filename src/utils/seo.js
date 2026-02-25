const SITE_NAME = 'ProGreen Clean';
const SITE_URL = 'https://progreenclean.co.uk';

export function generatePageTitle(pathname, customTitle) {
  if (customTitle) {
    return `${customTitle} | ${SITE_NAME}`;
  }
  const segments = pathname.replace(/^\/|\/$/g, '').split('/');
  if (segments[0] === '' || pathname === '/') {
    return `Professional Window & Gutter Cleaning in Epsom | ${SITE_NAME}`;
  }
  const title = segments
    .map((s) => s.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '))
    .reverse()
    .join(' | ');
  return `${title} | ${SITE_NAME}`;
}

export function generateMetaDescription(text, pathname) {
  if (text) {
    return text.length > 160 ? text.substring(0, 157) + '...' : text;
  }
  const defaults = {
    '/': 'Eco-friendly window, gutter and exterior cleaning in Epsom, Surrey. Fully insured, 10+ years experience. Get your free instant quote today.',
    '/about/': 'Meet the team behind ProGreen Clean. Family-run, fully insured cleaning specialists serving Epsom and Surrey for over 10 years.',
    '/services/': 'Browse our full range of domestic and commercial cleaning services in Epsom and Surrey. Windows, gutters, carpets, ovens and more.',
    '/contact/': 'Get in touch with ProGreen Clean Ltd. Call 01372 898732 or visit us at 99 Ebbisham Rd, Epsom, KT18 7NS.',
    '/quote/': 'Get an instant, no-obligation quote for professional cleaning services in Epsom and Surrey. Fast, simple, transparent pricing.',
  };
  return defaults[pathname] || `Professional cleaning services in Epsom, Surrey. ${SITE_NAME} — fully insured, eco-friendly, trusted locally.`;
}

export function generateCanonicalUrl(astroUrl) {
  const url = new URL(astroUrl);
  let pathname = url.pathname;
  if (pathname !== '/' && !pathname.endsWith('/')) {
    pathname += '/';
  }
  return `${SITE_URL}${pathname}`;
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'ProGreen Clean Ltd',
    image: `${SITE_URL}/og-default.jpg`,
    telephone: '01372 898732',
    email: 'info@progreenclean.co.uk',
    url: SITE_URL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '99 Ebbisham Rd',
      addressLocality: 'Epsom',
      addressRegion: 'Surrey',
      postalCode: 'KT18 7NS',
      addressCountry: 'GB',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: [
      { '@type': 'City', name: 'Epsom' },
      { '@type': 'City', name: 'Ewell' },
      { '@type': 'City', name: 'Ashtead' },
      { '@type': 'City', name: 'Leatherhead' },
      { '@type': 'City', name: 'Banstead' },
      { '@type': 'City', name: 'Chessington' },
    ],
    priceRange: '££',
  };
}

export function generateServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Place', name: 'Epsom, Surrey' },
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GBP',
        price: service.price.replace(/[^0-9.]/g, ''),
        description: service.price,
      },
    }),
  };
}

export function generateFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

