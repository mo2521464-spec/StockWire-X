export interface BrandTokens {
  name: string;
  domain?: string;
  logoPrimary: string;
  logoVertical: string;
  logomark: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    navy1: string;
    navy2: string;
    orange: string;
    gold: string;
    background: string;
    foreground: string;
    muted: string;
  };
  ctaColor: string;
  textColor: string;
  faviconSet: {
    favicon32: string;
    favicon48: string;
    favicon64: string;
    favicon128: string;
    favicon256: string;
  };
  typography: {
    headingFont: string;
    subheadingFont: string;
    bodyFont: string;
    accentFont: string;
  };
  socialCovers: {
    linkedin: string; // 1128×191
    youtube: string; // 2560×1440
    x: string; // 1500×500
    facebook: string; // 820×312
  };
  essence: string;
}

export const stockWireXTokens: BrandTokens = {
  name: "StockWire X",
  domain: "stockwirex.com",
  logoPrimary: "/logos/stockwirex-primary.svg",
  logoVertical: "/logos/stockwirex-vertical.svg",
  logomark: "/logos/stockwirex-mark.svg",
  palette: {
    primary: "#051230",
    secondary: "#0B1630",
    accent: "#E77E22",
    navy1: "#051230",
    navy2: "#0B1630",
    orange: "#E77E22",
    gold: "#EDBF54",
    background: "#FFFFFF",
    foreground: "#051230",
    muted: "#6B7280",
  },
  ctaColor: "#E77E22",
  textColor: "#051230",
  faviconSet: {
    favicon32: "/favicons/stockwirex-32.png",
    favicon48: "/favicons/stockwirex-48.png",
    favicon64: "/favicons/stockwirex-64.png",
    favicon128: "/favicons/stockwirex-128.png",
    favicon256: "/favicons/stockwirex-256.png",
  },
  typography: {
    headingFont: "Inter",
    subheadingFont: "Inter",
    bodyFont: "Inter",
    accentFont: "Poppins",
  },
  socialCovers: {
    linkedin: "/social/stockwirex-linkedin-1128x191.jpg",
    youtube: "/social/stockwirex-youtube-2560x1440.jpg",
    x: "/social/stockwirex-x-1500x500.jpg",
    facebook: "/social/stockwirex-facebook-820x312.jpg",
  },
  essence:
    "Empower investors with fast, clear, actionable market intelligence. Insights at speed.",
};

export const discoveryAlertTokens: BrandTokens = {
  name: "Discovery Alert",
  domain: "discoveryalert.com",
  logoPrimary: "/logos/discoveryalert-primary.svg",
  logoVertical: "/logos/discoveryalert-vertical.svg",
  logomark: "/logos/discoveryalert-mark.svg",
  palette: {
    primary: "#1E3A8A",
    secondary: "#3B82F6",
    accent: "#F59E0B",
    navy1: "#1E3A8A",
    navy2: "#1E40AF",
    orange: "#F59E0B",
    gold: "#FCD34D",
    background: "#FFFFFF",
    foreground: "#1E3A8A",
    muted: "#6B7280",
  },
  ctaColor: "#F59E0B",
  textColor: "#1E3A8A",
  faviconSet: {
    favicon32: "/favicons/discoveryalert-32.png",
    favicon48: "/favicons/discoveryalert-48.png",
    favicon64: "/favicons/discoveryalert-64.png",
    favicon128: "/favicons/discoveryalert-128.png",
    favicon256: "/favicons/discoveryalert-256.png",
  },
  typography: {
    headingFont: "Inter",
    subheadingFont: "Inter",
    bodyFont: "Inter",
    accentFont: "Poppins",
  },
  socialCovers: {
    linkedin: "/social/discoveryalert-linkedin-1128x191.jpg",
    youtube: "/social/discoveryalert-youtube-2560x1440.jpg",
    x: "/social/discoveryalert-x-1500x500.jpg",
    facebook: "/social/discoveryalert-facebook-820x312.jpg",
  },
  essence:
    "Discover tomorrow's opportunities today with intelligent market alerts.",
};

export type BrandKey = "stockwirex" | "discoveryalert";

export const brands: Record<BrandKey, BrandTokens> = {
  stockwirex: stockWireXTokens,
  discoveryalert: discoveryAlertTokens,
};

// Default to StockWire X
export const getCurrentBrand = (): BrandTokens => {
  // In a real application, this would check domain, URL params, or other brand switching logic
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  if (hostname.includes("discoveryalert")) {
    return discoveryAlertTokens;
  }

  return stockWireXTokens;
};

export const useBrand = () => {
  return getCurrentBrand();
};
