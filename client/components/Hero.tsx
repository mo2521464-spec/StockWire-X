import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, ArrowRight } from "lucide-react";
import { useBrand } from "@/lib/brand-tokens";
import { useAnalytics } from "@/lib/analytics";

interface HeroProps {
  title?: string;
  subtitle?: string;
  onSearch?: (query: string) => void;
  onCtaPrimary?: () => void;
  onCtaSecondary?: () => void;
  showTicker?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title = "Insights at the Speed of Markets.",
  subtitle = "Breaking ASX news across multiple sectors.",
  onSearch,
  onCtaPrimary,
  onCtaSecondary,
  showTicker = true,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const brand = useBrand();
  const { trackSearch, trackCtaClick } = useAnalytics();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      trackSearch(searchQuery.trim());
      onSearch(searchQuery.trim());
    }
  };

  const tickerData = [
    { symbol: "ASX 200", value: "8,234.50", change: "+0.85%", positive: true },
    { symbol: "ALL ORDS", value: "8,456.20", change: "+0.72%", positive: true },
    { symbol: "GOLD", value: "$2,645.80", change: "-0.31%", positive: false },
    { symbol: "OIL", value: "$94.25", change: "+1.24%", positive: true },
    { symbol: "AUD/USD", value: "0.6485", change: "+0.15%", positive: true },
  ];

  return (
    <section className="relative bg-gradient-to-br from-navy-1 via-navy-2 to-navy-1 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]'
          }
        ></div>
      </div>

      <div className="relative z-10">
        {/* Ticker Strip */}
        {showTicker && (
          <div className="border-b border-white/10 bg-navy-2/50 backdrop-blur-sm">
            <div className="content-max-width content-padding">
              <div className="flex items-center space-x-8 py-3 overflow-x-auto scrollbar-hide">
                <div className="flex items-center space-x-2 text-sm whitespace-nowrap">
                  <TrendingUp className="w-4 h-4 text-brand-orange" />
                  <span className="text-white/70 font-medium">
                    Live Markets:
                  </span>
                </div>
                {tickerData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 whitespace-nowrap"
                  >
                    <span className="font-semibold text-white">
                      {item.symbol}
                    </span>
                    <span className="text-white/90">{item.value}</span>
                    <span
                      className={`text-sm font-medium ${
                        item.positive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Hero Content */}
        <div className="content-max-width content-padding section-padding">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8">
              <span className="bg-gradient-to-r from-white via-white to-brand-gold bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-subheading text-xl md:text-2xl lg:text-3xl text-white/95 mb-12 max-w-3xl mx-auto">
              {subtitle}
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto mb-12">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 transition-colors duration-200 group-focus-within:text-brand-orange" />
                  <Input
                    type="text"
                    placeholder="Search companies, tickers, or news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-14 pr-32 py-5 text-lg bg-white/98 backdrop-blur-sm border-0 text-navy-1 placeholder:text-gray-500 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 rounded-xl shadow-brand-lg transition-brand font-body"
                  />
                  <Button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3 rounded-lg font-subheading transition-brand hover-lift"
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                onClick={() => {
                  trackCtaClick("Get Free Alerts", "hero", "primary");
                  onCtaPrimary?.();
                }}
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-subheading px-10 py-5 text-xl rounded-xl shadow-brand-lg hover:shadow-2xl transition-brand hover-lift group focus-brand"
              >
                Get Free Alerts
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button
                onClick={() => {
                  trackCtaClick("See Membership Options", "hero", "secondary");
                  onCtaSecondary?.();
                }}
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-navy-1 font-subheading px-10 py-5 text-xl rounded-xl transition-brand hover-lift bg-transparent/5 backdrop-blur-sm focus-brand"
              >
                See Membership Options
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-base text-white/80 font-body">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                <span className="font-medium">Live ASX Data</span>
              </div>
              <div className="hidden sm:block w-2 h-2 bg-white/30 rounded-full"></div>
              <div className="flex items-center gap-3">
                <span className="font-accent text-brand-gold">250,000+</span>
                <span className="font-medium">Monthly Readers</span>
              </div>
              <div className="hidden sm:block w-2 h-2 bg-white/30 rounded-full"></div>
              <div className="flex items-center gap-3">
                <span className="font-medium">Real-time Alerts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
