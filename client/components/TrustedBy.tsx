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

            {/* Premium Tier Logos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center mb-8">
              {logos
                .filter((logo) => logo.tier === "premium")
                .slice(0, 10)
                .map((logo, index) => (
                  <div
                    key={logo.id}
                    className="group cursor-pointer transition-all duration-300 hover:scale-105"
                    onClick={() =>
                      logo.website && window.open(logo.website, "_blank")
                    }
                  >
                    <div className="w-32 h-20 flex items-center justify-center p-4 bg-white rounded-lg border border-gray-100 hover:border-brand-orange/30 hover:shadow-md transition-all duration-300">
                      <img
                        src={logo.logoUrl}
                        alt={`${logo.name} logo`}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
            </div>

            <Separator className="max-w-2xl mx-auto" />

            {/* Standard Tier Logos - Smaller */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center opacity-75">
              {logos
                .filter((logo) => logo.tier === "standard")
                .slice(0, 12)
                .map((logo, index) => (
                  <div
                    key={logo.id}
                    className="group cursor-pointer transition-all duration-300 hover:opacity-100"
                    onClick={() =>
                      logo.website && window.open(logo.website, "_blank")
                    }
                  >
                    <div className="w-24 h-16 flex items-center justify-center p-3 bg-white rounded-lg border border-gray-50 hover:border-gray-200 transition-all duration-300">
                      <img
                        src={logo.logoUrl}
                        alt={`${logo.name} logo`}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
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
      logoUrl: "/images/logo1.jpg",
      tier: "premium",
      website: "https://commbank.com.au",
    },
    {
      id: "2",
      name: "BHP Group",
      logoUrl: "/images/logo2.jpg",
      tier: "premium",
      website: "https://bhp.com",
    },
    {
      id: "3",
      name: "CSL Limited",
      logoUrl: "/images/logo3.jpg",
      tier: "premium",
      website: "https://csl.com",
    },
    {
      id: "4",
      name: "Westpac",
      logoUrl: "/images/logo4.jpg",
      tier: "premium",
      website: "https://westpac.com.au",
    },
    {
      id: "5",
      name: "Rio Tinto",
      logoUrl: "/images/logo5.jpg",
      tier: "premium",
      website: "https://riotinto.com",
    },
    {
      id: "6",
      name: "ANZ Bank",
      logoUrl: "/images/logo6.jpg",
      tier: "premium",
      website: "https://anz.com.au",
    },
    {
      id: "7",
      name: "Telstra",
      logoUrl: "/images/logo7.jpg",
      tier: "premium",
      website: "https://telstra.com.au",
    },
    {
      id: "8",
      name: "Woolworths",
      logoUrl: "/images/logo8.jpg",
      tier: "premium",
      website: "https://woolworths.com.au",
    },
    {
      id: "9",
      name: "NAB",
      logoUrl: "/images/logo9.jpg",
      tier: "premium",
      website: "https://nab.com.au",
    },
    {
      id: "10",
      name: "Macquarie Group",
      logoUrl: "/images/logo10.jpg",
      tier: "premium",
      website: "https://macquarie.com",
    },

    // Standard tier (smaller)
    {
      id: "11",
      name: "REA Group",
      logoUrl: "/images/logoSTD.jpg",
      tier: "standard",
    },
    {
      id: "12",
      name: "Xero",
      logoUrl: "/images/logoSTD.jpg",
      tier: "standard",
    },
    {
      id: "13",
      name: "Afterpay",
      logoUrl: "/images/logoSTD.jpg",
      tier: "standard",
    },
    {
      id: "14",
      name: "Seek",
      logoUrl: "/images/logoSTD.jpg",
      tier: "standard",
    },
    {
      id: "15",
      name: "JB Hi-Fi",
      logoUrl: "/images/logoSTD.jpg",
      tier: "standard",
    },
    {
      id: "16",
      name: "Harvey Norman",
      logoUrl: "/images/logoSTD.jpg",
      tier: "standard",
    },
    {
      id: "17",
      name: "Flight Centre",
      logoUrl: "/images/logoSTD.jpg",
      tier: "standard",
    },
    {
      id: "18",
      name: "Cochlear",
      logoUrl: "/images/logoSTD.jpg",
      tier: "standard",
    },
    {
      id: "19",
      name: "Sonic Healthcare",
      logoUrl: "/images/logoSTD.jpg",
      tier: "standard",
    },
    {
      id: "20",
      name: "TPG Telecom",
      logoUrl: "/images/logoSTD.jpg",
      tier: "standard",
    },
    {
      id: "21",
      name: "Medibank",
      logoUrl: "/images/logoSTD.jpg",
      tier: "standard",
    },
    {
      id: "22",
      name: "Aurizon",
      logoUrl: "/images/logoSTD.jpg",
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
