import React from "react";
import Hero from "@/components/Hero";
import TopNewsFeed from "@/components/TopNewsFeed";
import { CategoryBlockSection } from "@/components/CategoryBlock";
import { MediaHighlightsWithData } from "@/components/MediaHighlights";
import { TrustedByWithData } from "@/components/TrustedBy";
import AboutStrip from "@/components/AboutStrip";
import EmailSignup from "@/components/EmailSignup";
import PartnerZone from "@/components/PartnerZone";
import SiteFooter from "@/components/SiteFooter";
import { useBrand } from "@/lib/brand-tokens";

export default function Index() {
  const brand = useBrand();

  // Hero event handlers
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    // In a real app, this would navigate to search results
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  const handleCtaPrimary = () => {
    console.log("Get Free Alerts clicked");
    // In a real app, this would open the email signup modal or navigate to signup
    document
      .getElementById("email-signup")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCtaSecondary = () => {
    console.log("See Membership Options clicked");
    // In a real app, this would navigate to pricing/membership page
    window.location.href = "/membership";
  };

  // TopNewsFeed event handlers
  const handleFilterChange = (sector: string, tags: string[], sort: string) => {
    console.log("Filter changed:", { sector, tags, sort });
    // In a real app, this would update the news feed via API
  };

  // EmailSignup event handler
  const handleEmailSignup = (data: any) => {
    console.log("Email signup:", data);
    // In a real app, this would submit to your backend/CRM
  };

  // PartnerZone event handlers
  const handleAdvertise = () => {
    console.log("Advertise With Us clicked");
    window.location.href = "/advertise";
  };

  const handleDiscussOpportunities = () => {
    console.log("Discuss Opportunities clicked");
    window.location.href = "/partnerships";
  };

  return (
    <main className="min-h-screen">
      {/* 1. Hero Section - Above the Fold */}
      <Hero
        title="Insights at the Speed of Markets."
        subtitle="Breaking ASX news across multiple sectors."
        onSearch={handleSearch}
        onCtaPrimary={handleCtaPrimary}
        onCtaSecondary={handleCtaSecondary}
        showTicker={true}
      />

      {/* 2. Top News Feed */}
      <TopNewsFeed
        initialSector="all"
        tagFilters={[
          "Quarterly Results",
          "M&A",
          "Capital Raises",
          "Earnings",
          "Acquisitions",
          "IPO",
        ]}
        pagination={true}
        onFilterChange={handleFilterChange}
      />

      {/* 3. Category Sections for SEO Boost */}
      <CategoryBlockSection />

      {/* 4. Video / Media Highlights */}
      <MediaHighlightsWithData />

      {/* 5. Trusted By - Social Proof */}
      <TrustedByWithData />

      {/* 6. About & Who We Are */}
      <AboutStrip
        partnerBadge={true}
        text="StockWire X delivers independent market intelligence powered by cutting-edge AI technology and real-time ASX data analysis."
        showStats={true}
        variant="default"
      />

      {/* 7. Email Capture & Engagement */}
      <div id="email-signup">
        <EmailSignup
          variant="standalone"
          onSubmit={handleEmailSignup}
          title="Get Breaking ASX Alerts Direct to Your Inbox."
          subtitle="Join 250,000+ monthly readers."
          credibilityText="Join thousands of investors who rely on StockWire X for timely, accurate market intelligence."
          showFeatures={true}
        />
      </div>

      {/* 8. Partner Zone */}
      <PartnerZone
        onAdvertise={handleAdvertise}
        onDiscuss={handleDiscussOpportunities}
        headline="Work With Us"
        subheadline="Connect with one of Australia's largest ASX investor audiences."
        showStats={true}
        showPackages={true}
      />

      {/* 9. Trending Section (Optional) */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading text-2xl md:text-3xl text-navy-1 mb-4">
                Trending on StockWire X
              </h2>
              <p className="font-body text-gray-600">
                Most-read stories and investor hot topics this week
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Mock trending articles */}
              {[
                {
                  title: "ASX 200 Hits New All-Time High Amid Tech Surge",
                  readTime: "3 min read",
                  views: "25.4K views",
                },
                {
                  title: "Major Mining Deal Reshapes Resource Sector",
                  readTime: "5 min read",
                  views: "18.7K views",
                },
                {
                  title: "Biotech Breakthrough Drives Healthcare Rally",
                  readTime: "4 min read",
                  views: "16.2K views",
                },
              ].map((article, index) => (
                <div
                  key={index}
                  className="p-8 bg-white rounded-xl border border-gray-700/10 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm font-medium text-brand-orange">
                      #{index + 1} Trending
                    </span>
                    <span className="text-xs text-gray-500">
                      {article.views}
                    </span>
                  </div>
                  <h3 className="font-subheading text-lg text-navy-1 mb-2 line-clamp-2 hover:text-brand-orange transition-colors duration-200">
                    {article.title}
                  </h3>
                  <div className="text-sm text-gray-500">
                    {article.readTime}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Site Footer */}
      <SiteFooter showNewsletter={true} showContactInfo={true} />
    </main>
  );
}
