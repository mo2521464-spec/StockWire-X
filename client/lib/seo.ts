import { useBrand } from "./brand-tokens";

interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export const generateMetaTags = (config: SEOConfig) => {
  const brand = useBrand();
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://stockwirex.com";

  const metaTags = [
    // Basic meta tags
    { name: "description", content: config.description },
    {
      name: "keywords",
      content: `ASX, Australian Stock Exchange, market news, ${config.tags?.join(", ") || ""}`,
    },
    { name: "author", content: config.author || brand.name },

    // Open Graph tags
    { property: "og:site_name", content: brand.name },
    { property: "og:title", content: config.title },
    { property: "og:description", content: config.description },
    { property: "og:type", content: config.type || "website" },
    { property: "og:url", content: config.canonical || baseUrl },
    {
      property: "og:image",
      content: config.image || `${baseUrl}/og-image.jpg`,
    },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@stockwirex" },
    { name: "twitter:title", content: config.title },
    { name: "twitter:description", content: config.description },
    {
      name: "twitter:image",
      content: config.image || `${baseUrl}/twitter-image.jpg`,
    },

    // Article-specific tags
    ...(config.type === "article"
      ? [
          { property: "article:published_time", content: config.publishedTime },
          { property: "article:modified_time", content: config.modifiedTime },
          { property: "article:author", content: config.author },
          { property: "article:section", content: config.section },
          ...(config.tags?.map((tag) => ({
            property: "article:tag",
            content: tag,
          })) || []),
        ]
      : []),
  ];

  return metaTags;
};

export const generateStructuredData = (
  type: "website" | "newsarticle" | "breadcrumb",
  data: any,
) => {
  const brand = useBrand();
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://stockwirex.com";

  switch (type) {
    case "website":
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: brand.name,
        description: brand.essence,
        url: baseUrl,
        publisher: {
          "@type": "Organization",
          name: brand.name,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}${brand.logoPrimary}`,
          },
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      };

    case "newsarticle":
      return {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: data.title,
        description: data.excerpt,
        image: data.coverImage ? [data.coverImage] : [],
        datePublished: data.publishedAt,
        dateModified: data.updatedAt || data.publishedAt,
        author: {
          "@type": "Person",
          name: data.author,
        },
        publisher: {
          "@type": "Organization",
          name: brand.name,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}${brand.logoPrimary}`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/articles/${data.slug || data.id}`,
        },
        articleSection: data.sector,
        keywords: data.tags?.join(", "),
        about: data.ticker?.map((ticker: string) => ({
          "@type": "Organization",
          name: ticker,
          tickerSymbol: ticker,
        })),
      };

    case "breadcrumb":
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url ? `${baseUrl}${item.url}` : undefined,
        })),
      };

    default:
      return null;
  }
};

export const generateNewsMapSitemap = (articles: any[]) => {
  const brand = useBrand();
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://stockwirex.com";

  const newsItems = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug || article.id}`,
    publishedDate: article.publishedAt,
    title: article.title,
    keywords: article.tags?.join(", "),
    stockTickers: article.ticker?.join(", "),
  }));

  return newsItems;
};

// SEO-friendly URL slug generator
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

// Inject structured data into page head
export const injectStructuredData = (structuredData: any) => {
  if (typeof window === "undefined") return;

  const existingScript = document.querySelector(
    'script[type="application/ld+json"]',
  );
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};

// Update page meta tags
export const updateMetaTags = (config: SEOConfig) => {
  if (typeof window === "undefined") return;

  // Update title
  document.title = config.title;

  // Update or create meta tags
  const metaTags = generateMetaTags(config);

  metaTags.forEach((tag) => {
    const selector = tag.name
      ? `meta[name="${tag.name}"]`
      : `meta[property="${tag.property}"]`;
    let element = document.querySelector(selector) as HTMLMetaElement;

    if (!element) {
      element = document.createElement("meta");
      if (tag.name) element.name = tag.name;
      if (tag.property) element.setAttribute("property", tag.property);
      document.head.appendChild(element);
    }

    element.content = tag.content;
  });

  // Update canonical link
  if (config.canonical) {
    let canonicalLink = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = config.canonical;
  }
};
