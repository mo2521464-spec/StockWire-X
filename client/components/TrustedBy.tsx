import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Users, Mail, Globe } from "lucide-react";
import { useBrand } from "@/lib/brand-tokens";

interface CompanyLogo {
  id: string;
  name: string;
  logoUrl: string;
  website?: string;
  tier: "premium" | "standard";
}

interface TrustedByStats {
  monthlyReaders: number;
  emailList: number;
  socialReach: number;
  companiesCovered: number;
}

interface TrustedByProps {
  logos: CompanyLogo[];
  stats: TrustedByStats;
  headline?: string;
  showPartnerBadge?: boolean;
}

const TrustedBy: React.FC<TrustedByProps> = ({
  logos,
  stats,
  headline = "Trusted by ASX-listed companies & 250,000+ monthly readers.",
  showPartnerBadge = true,
}) => {
  const brand = useBrand();

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${Math.round(num / 1000)}K`;
    }
    return num.toString();
  };

  const statsData = [
    {
      icon: <Users className="w-6 h-6" />,
      value: formatNumber(stats.monthlyReaders),
      label: "Monthly Readers",
      description: "Active audience",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      value: formatNumber(stats.emailList),
      label: "Email Subscribers",
      description: "Daily alerts",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      value: formatNumber(stats.socialReach),
      label: "Social Reach",
      description: "Across platforms",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: stats.companiesCovered.toString(),
      label: "Companies Covered",
      description: "ASX listings",
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-navy-1 mb-6 max-w-4xl mx-auto">
              {headline}
            </h2>
            {showPartnerBadge && (
              <div className="flex justify-center mb-8">
                <Badge
                  variant="outline"
                  className="text-sm px-4 py-2 border-brand-orange text-brand-orange bg-brand-orange/5"
                >
                  Official Google Cloud Partner
                </Badge>
              </div>
            )}
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-brand-orange/10 rounded-lg text-brand-orange">
                    {stat.icon}
                  </div>
                </div>
                <div className="font-heading text-3xl lg:text-4xl text-navy-1 mb-2">
                  {stat.value}
                </div>
                <div className="font-subheading text-sm lg:text-base text-navy-1 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>

          {/* Client Logos Section */}
          <div className="space-y-8">
            <h3 className="font-subheading text-xl text-center text-gray-700">
              Trusted by leading ASX companies and institutions
            </h3>

            {/* Infinite Scrolling Marquee */}
            <div className="relative overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap">
                {/* First set of logos */}
                {logos.map((logo, index) => (
                  <div
                    key={`first-${logo.id}`}
                    className="group cursor-pointer transition-all duration-300 hover:scale-105 mx-8 flex-shrink-0"
                    onClick={() =>
                      logo.website && window.open(logo.website, "_blank")
                    }
                  >
                    <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-700/10 hover:border-brand-orange/30 hover:shadow-md transition-all duration-300 min-w-[120px] h-20">
                      <img
                        src={logo.logoUrl}
                        alt={`${logo.name} logo`}
                        className="h-16 w-auto object-contain transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {logos.map((logo, index) => (
                  <div
                    key={`second-${logo.id}`}
                    className="group cursor-pointer transition-all duration-300 hover:scale-105 mx-8 flex-shrink-0"
                    onClick={() =>
                      logo.website && window.open(logo.website, "_blank")
                    }
                  >
                    <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-700/10 hover:border-brand-orange/30 hover:shadow-md transition-all duration-300 min-w-[120px] h-20">
                      <img
                        src={logo.logoUrl}
                        alt={`${logo.name} logo`}
                        className="h-16 w-auto object-contain transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                </div>
                <div className="font-subheading text-sm text-navy-1">
                  Editorial Independence
                </div>
                <div className="text-xs text-gray-500">
                  Unbiased market analysis
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <div className="font-subheading text-sm text-navy-1">
                  Real-time Data
                </div>
                <div className="text-xs text-gray-500">
                  Live ASX announcements
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-brand-orange" />
                </div>
                <div className="font-subheading text-sm text-navy-1">
                  Global Recognition
                </div>
                <div className="text-xs text-gray-500">
                  International partnerships
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Example usage with mock data
export const TrustedByWithData: React.FC = () => {
  const mockLogos: CompanyLogo[] = [
    // Premium tier (larger, more prominent)
    {
      id: "1",
      name: "Commonwealth Bank",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2F67d726da1b8c4ec9b8d8d5a48935f798?format=webp&width=800",
      tier: "premium",
      website: "https://commbank.com.au",
    },
    {
      id: "2",
      name: "BHP Group",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2F9b05899d26ce4f53bb3548f9110bbbb9?format=webp&width=800",
      tier: "premium",
      website: "https://bhp.com",
    },
    {
      id: "3",
      name: "ANZ Bank",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2Fa36ce14ad68149f0afe9832e87132246?format=webp&width=800",
      tier: "premium",
      website: "https://anz.com.au",
    },
    {
      id: "4",
      name: "Woolworths",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2F5eeba8dd689541a698f53e291b2af84c?format=webp&width=800",
      tier: "premium",
      website: "https://woolworths.com.au",
    },
    {
      id: "5",
      name: "NAB",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2F4979ade39eb44f07966fa5738fce8a27?format=webp&width=800",
      tier: "premium",
      website: "https://nab.com.au",
    },
    {
      id: "6",
      name: "Macquarie Group",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2F0faa9857a573452ea60c6db4c1103bda?format=webp&width=800",
      tier: "premium",
      website: "https://macquarie.com",
    },

    // Standard tier (smaller)
    {
      id: "7",
      name: "Xero",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2F95b751d5477245d18188ba6eb0d7c415?format=webp&width=800",
      tier: "standard",
    },
    {
      id: "8",
      name: "Afterpay",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2F811d9f22e67d4d2abcafd7a1cf91b451?format=webp&width=800",
      tier: "standard",
    },
    {
      id: "9",
      name: "Cochlear",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2F2bb1a06f8d944df79f7f942652464140?format=webp&width=800",
      tier: "standard",
    },
    {
      id: "10",
      name: "Sonic Healthcare",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2F2933817e6d92492ab14ea5ab06712e69?format=webp&width=800",
      tier: "standard",
    },
    {
      id: "11",
      name: "TPG Telecom",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2Fdad869db42744e28a855ba8a5621d500?format=webp&width=800",
      tier: "standard",
    },
    {
      id: "12",
      name: "Medibank",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2F1f243f4d6c864839b8b7d8c857c380a8?format=webp&width=800",
      tier: "standard",
    },
    {
      id: "13",
      name: "Aurizon",
      logoUrl:
        "https://cdn.builder.io/api/v1/image/assets%2F5d066c74ac8e430bb115fd2558261e00%2F799b66af367c4125aaa1a93cd05fa9cc?format=webp&width=800",
      tier: "standard",
    },
  ];

  const mockStats: TrustedByStats = {
    monthlyReaders: 250000,
    emailList: 85000,
    socialReach: 500000,
    companiesCovered: 2200,
  };

  return <TrustedBy logos={mockLogos} stats={mockStats} />;
};

export default TrustedBy;
