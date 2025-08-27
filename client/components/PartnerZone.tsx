import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  TrendingUp,
  Target,
  ArrowRight,
  Mail,
  Phone,
  Calendar,
  Globe,
  BarChart3,
  Megaphone,
  HandshakeIcon,
} from "lucide-react";
import { useBrand } from "@/lib/brand-tokens";

interface PartnerZoneProps {
  onAdvertise?: () => void;
  onDiscuss?: () => void;
  headline?: string;
  subheadline?: string;
  showStats?: boolean;
  showPackages?: boolean;
}

const PartnerZone: React.FC<PartnerZoneProps> = ({
  onAdvertise,
  onDiscuss,
  headline = "Work With Us",
  subheadline = "Connect with one of Australia's largest ASX investor audiences.",
  showStats = true,
  showPackages = true,
}) => {
  const brand = useBrand();

  const audienceStats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "250,000+",
      label: "Monthly Readers",
      description: "Active, engaged investors",
    },
    {
      icon: <Target className="w-6 h-6" />,
      value: "85%",
      label: "ASX Investors",
      description: "Direct target audience",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      value: "42%",
      label: "Growth Rate",
      description: "Year-over-year audience growth",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      value: "2.5M+",
      label: "Annual Reach",
      description: "Cross-platform impressions",
    },
  ];

  const partnershipOptions = [
    {
      title: "Sponsored Content",
      description:
        "Native advertising that provides value to our readers while promoting your brand",
      features: [
        "Editorial oversight",
        "High engagement rates",
        "Brand-safe environment",
      ],
      icon: <Megaphone className="w-8 h-8" />,
      color: "bg-blue-500",
    },
    {
      title: "Display Advertising",
      description:
        "Premium placements across our platform for maximum visibility",
      features: [
        "Multiple ad formats",
        "Targeted placement",
        "Performance tracking",
      ],
      icon: <BarChart3 className="w-8 h-8" />,
      color: "bg-green-500",
    },
    {
      title: "Content Partnership",
      description: "Collaborate on thought leadership and educational content",
      features: [
        "Expert positioning",
        "Audience building",
        "Long-term partnership",
      ],
      icon: <HandshakeIcon className="w-8 h-8" />,
      color: "bg-purple-500",
    },
  ];

  const handleAdvertiseClick = () => {
    if (onAdvertise) {
      onAdvertise();
    } else {
      // Default action - could open a modal or navigate to contact form
      window.location.href = "/advertise";
    }
  };

  const handleDiscussClick = () => {
    if (onDiscuss) {
      onDiscuss();
    } else {
      // Default action - could open a calendar booking or contact form
      window.location.href = "/partnerships";
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-navy-1 mb-6">
              {headline}
            </h2>
            <p className="font-subheading text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {subheadline}
            </p>
            <Badge
              variant="outline"
              className="text-sm px-4 py-2 border-brand-orange text-brand-orange bg-brand-orange/5"
            >
              Trusted by 50+ ASX-listed companies
            </Badge>
          </div>

          {/* Audience Statistics */}
          {showStats && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {audienceStats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-brand-orange/10 rounded-lg text-brand-orange">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="font-heading text-3xl text-navy-1 mb-2">
                      {stat.value}
                    </div>
                    <div className="font-subheading text-navy-1 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-500">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Partnership Options */}
          {showPackages && (
            <div className="mb-16">
              <h3 className="font-heading text-2xl md:text-3xl text-center text-navy-1 mb-12">
                Partnership Opportunities
              </h3>
              <div className="grid gap-8 md:grid-cols-3">
                {partnershipOptions.map((option, index) => (
                  <Card
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div
                          className={`p-3 ${option.color} rounded-lg text-white`}
                        >
                          {option.icon}
                        </div>
                        <h4 className="font-subheading text-xl text-navy-1">
                          {option.title}
                        </h4>
                      </div>
                      <p className="font-body text-gray-600 mb-6">
                        {option.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {option.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center space-x-2 text-sm text-gray-700"
                          >
                            <div className="w-1.5 h-1.5 bg-brand-orange rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-navy-1 to-navy-2 rounded-2xl p-8 md:p-12 text-white text-center">
            <h3 className="font-heading text-2xl md:text-3xl mb-4">
              Ready to Reach Our Audience?
            </h3>
            <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join leading brands who trust StockWire X to connect with serious
              investors and market professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleAdvertiseClick}
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                <Megaphone className="w-5 h-5 mr-2" />
                Advertise With Us
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button
                onClick={handleDiscussClick}
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-navy-1 font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-200 bg-transparent"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Discuss Opportunities
              </Button>
            </div>

            {/* Contact Information */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-sm text-white/80">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>partnerships@stockwirex.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+61 2 9000 0000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="font-body text-sm text-gray-600 mb-4">
              Trusted advertising partner for leading brands
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              {/* These would be actual client logos */}
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                Client Logo
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                Client Logo
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                Client Logo
              </div>
              <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                Client Logo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerZone;
