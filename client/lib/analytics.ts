// Google Analytics 4 Event Tracking
// As specified: GA4 events (click_cta, newsletter_signup, filter_change, video_play)

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

class Analytics {
  private isInitialized = false;
  private isProduction = import.meta.env.MODE === "production";

  // Initialize GA4
  init(measurementId: string) {
    if (typeof window === "undefined" || this.isInitialized) return;

    // Only initialize in production or when explicitly enabled
    if (!this.isProduction && !import.meta.env.VITE_ENABLE_ANALYTICS) {
      console.log("Analytics disabled in development");
      return;
    }

    // Load GA4 script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
      window.dataLayer.push(args);
    };

    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      // Privacy-focused settings
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });

    this.isInitialized = true;
    console.log("Analytics initialized");
  }

  // Generic event tracking
  private track(event: AnalyticsEvent) {
    if (typeof window === "undefined" || !this.isInitialized) {
      console.log("Analytics event (not tracked):", event);
      return;
    }

    window.gtag("event", event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });

    console.log("Analytics event tracked:", event);
  }

  // CTA click tracking
  trackCtaClick(
    ctaText: string,
    location: string,
    ctaType: "primary" | "secondary" = "primary",
  ) {
    this.track({
      action: "click_cta",
      category: "engagement",
      label: ctaText,
      custom_parameters: {
        cta_location: location,
        cta_type: ctaType,
        page_url: window.location.pathname,
      },
    });
  }

  // Newsletter signup tracking
  trackNewsletterSignup(
    source: string,
    variant: "hero" | "inline" | "footer" | "modal" = "inline",
  ) {
    this.track({
      action: "newsletter_signup",
      category: "conversion",
      label: source,
      value: 1,
      custom_parameters: {
        signup_variant: variant,
        page_url: window.location.pathname,
      },
    });
  }

  // Filter change tracking
  trackFilterChange(
    filterType: "sector" | "tag" | "sort",
    filterValue: string,
    section: string,
  ) {
    this.track({
      action: "filter_change",
      category: "interaction",
      label: `${filterType}:${filterValue}`,
      custom_parameters: {
        filter_type: filterType,
        filter_value: filterValue,
        section: section,
        page_url: window.location.pathname,
      },
    });
  }

  // Video play tracking
  trackVideoPlay(
    videoTitle: string,
    videoDuration: string,
    platform: string,
    location: string,
  ) {
    this.track({
      action: "video_play",
      category: "media",
      label: videoTitle,
      custom_parameters: {
        video_duration: videoDuration,
        video_platform: platform,
        video_location: location,
        page_url: window.location.pathname,
      },
    });
  }

  // Search tracking
  trackSearch(query: string, resultsCount?: number) {
    this.track({
      action: "search",
      category: "interaction",
      label: query,
      value: resultsCount,
      custom_parameters: {
        search_term: query,
        results_count: resultsCount,
        page_url: window.location.pathname,
      },
    });
  }

  // Article view tracking
  trackArticleView(
    articleTitle: string,
    sector: string,
    author: string,
    tags: string[],
  ) {
    this.track({
      action: "article_view",
      category: "content",
      label: articleTitle,
      custom_parameters: {
        article_sector: sector,
        article_author: author,
        article_tags: tags.join(","),
        page_url: window.location.pathname,
      },
    });
  }

  // Page view tracking (for SPA navigation)
  trackPageView(pageTitle: string, pagePath: string) {
    if (typeof window === "undefined" || !this.isInitialized) return;

    window.gtag("config", this.isInitialized, {
      page_title: pageTitle,
      page_location: window.location.origin + pagePath,
    });
  }

  // Error tracking
  trackError(errorType: string, errorMessage: string, location: string) {
    this.track({
      action: "error",
      category: "technical",
      label: errorType,
      custom_parameters: {
        error_message: errorMessage,
        error_location: location,
        page_url: window.location.pathname,
      },
    });
  }

  // Performance tracking
  trackPerformance(metric: string, value: number, unit: string) {
    this.track({
      action: "performance_metric",
      category: "performance",
      label: metric,
      value: value,
      custom_parameters: {
        metric_unit: unit,
        page_url: window.location.pathname,
      },
    });
  }

  // Social share tracking
  trackSocialShare(
    platform: string,
    contentType: string,
    contentTitle: string,
  ) {
    this.track({
      action: "social_share",
      category: "engagement",
      label: platform,
      custom_parameters: {
        content_type: contentType,
        content_title: contentTitle,
        page_url: window.location.pathname,
      },
    });
  }

  // Partner interaction tracking
  trackPartnerInteraction(
    action: "advertise_click" | "discuss_click",
    location: string,
  ) {
    this.track({
      action: "partner_interaction",
      category: "business",
      label: action,
      custom_parameters: {
        interaction_location: location,
        page_url: window.location.pathname,
      },
    });
  }
}

// Create singleton instance
const analytics = new Analytics();

// Initialize analytics when DOM is ready
if (typeof window !== "undefined") {
  const initAnalytics = () => {
    // Get GA4 Measurement ID from Vite environment variables
    // Set VITE_GA4_MEASUREMENT_ID in your .env.local file
    const measurementId =
      import.meta.env.VITE_GA4_MEASUREMENT_ID || "G-XXXXXXXXXX";
    analytics.init(measurementId);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnalytics);
  } else {
    initAnalytics();
  }
}

export default analytics;

// React hook for analytics
export const useAnalytics = () => {
  return {
    trackCtaClick: analytics.trackCtaClick.bind(analytics),
    trackNewsletterSignup: analytics.trackNewsletterSignup.bind(analytics),
    trackFilterChange: analytics.trackFilterChange.bind(analytics),
    trackVideoPlay: analytics.trackVideoPlay.bind(analytics),
    trackSearch: analytics.trackSearch.bind(analytics),
    trackArticleView: analytics.trackArticleView.bind(analytics),
    trackPageView: analytics.trackPageView.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    trackSocialShare: analytics.trackSocialShare.bind(analytics),
    trackPartnerInteraction: analytics.trackPartnerInteraction.bind(analytics),
  };
};
