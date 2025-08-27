import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Eye,
  Zap,
  Award,
  ArrowRight,
  CheckCircle,
  Globe,
  Users,
  TrendingUp,
} from "lucide-react";
import { useBrand } from "@/lib/brand-tokens";

interface AboutStripProps {
  partnerBadge?: boolean;
  text?: string;
  showStats?: boolean;
  variant?: "default" | "detailed";
}

const AboutStrip: React.FC<AboutStripProps> = ({
  partnerBadge = true,
  text,
  showStats = true,
  variant = "default",
}) => {
  const brand = useBrand();

  const defaultText =
    "StockWire X delivers independent market intelligence powered by cutting-edge AI technology and real-time ASX data analysis.";

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Editorial Independence",
      description:
        "Unbiased analysis with no corporate influence on editorial decisions",
      highlight: "100% Independent",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Newsroom",
      description:
        "Advanced algorithms process ASX announcements within seconds of release",
      highlight: "Real-time Processing",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Transparency First",
      description:
        "Clear disclosure of sources, methodology, and potential conflicts",
      highlight: "Full Disclosure",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Scale",
      description:
        "Partnered with leading cloud infrastructure for reliable, fast delivery",
      highlight: "99.9% Uptime",
    },
  ];

  const stats = [
    {
      label: "ASX Announcements Processed",
      value: "50,000+",
      period: "per month",
    },
    { label: "Market Coverage", value: "100%", period: "ASX listed companies" },
    { label: "Response Time", value: "<30s", period: "breaking news alerts" },
    { label: "Accuracy Rate", value: "99.8%", period: "verified data" },
  ];

  if (variant === "detailed") {
    return (
      <section className="py-16 bg-gradient-to-br from-navy-1 to-navy-2 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/svg%3E\')]'
            }
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6">
                <span className="bg-gradient-to-r from-white to-brand-gold bg-clip-text text-transparent">
                  Who We Are
                </span>
              </h2>
              <p className="font-body text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                {text || defaultText}
              </p>
              {partnerBadge && (
                <div className="flex justify-center mt-6">
                  <Badge className="bg-white/10 border-brand-gold text-brand-gold px-6 py-2 text-sm">
                    <Award className="w-4 h-4 mr-2" />
                    Official Google Cloud Partner
                  </Badge>
                </div>
              )}
            </div>

            {/* Features Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-brand-orange/20 rounded-lg text-brand-orange">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="font-subheading text-lg mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="font-body text-sm text-white/70 mb-3">
                      {feature.description}
                    </p>
                    <Badge
                      variant="outline"
                      className="border-brand-gold text-brand-gold bg-brand-gold/10"
                    >
                      {feature.highlight}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Statistics */}
            {showStats && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                  >
                    <div className="font-heading text-3xl lg:text-4xl text-brand-orange mb-2">
                      {stat.value}
                    </div>
                    <div className="font-subheading text-sm text-white mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-white/60">{stat.period}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Section */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
              >
                Learn More About Our Mission
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default variant - simpler strip
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-12">
            {/* Content */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="font-heading text-xl md:text-2xl text-navy-1 mb-3">
                Independent & Transparent Market Intelligence
              </h3>
              <p className="font-body text-gray-600 mb-4">
                {text || defaultText}
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>100% Editorial Independence</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>AI-Powered Analysis</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Real-time ASX Data</span>
                </div>
              </div>
            </div>

            {/* Partnership Badge */}
            {partnerBadge && (
              <div className="flex-shrink-0">
                <div className="flex items-center space-x-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-subheading text-sm text-gray-700 mb-1">
                      Technology Partner
                    </div>
                    <Badge className="bg-blue-600 text-white">
                      Google Cloud
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats Bar */}
          {showStats && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="font-heading text-2xl text-brand-orange">
                    250K+
                  </div>
                  <div className="text-sm text-gray-600">Monthly Readers</div>
                </div>
                <div>
                  <div className="font-heading text-2xl text-brand-orange">
                    50K+
                  </div>
                  <div className="text-sm text-gray-600">
                    Monthly Announcements
                  </div>
                </div>
                <div>
                  <div className="font-heading text-2xl text-brand-orange">
                    2,200+
                  </div>
                  <div className="text-sm text-gray-600">Companies Covered</div>
                </div>
                <div>
                  <div className="font-heading text-2xl text-brand-orange">
                    99.8%
                  </div>
                  <div className="text-sm text-gray-600">Accuracy Rate</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutStrip;
