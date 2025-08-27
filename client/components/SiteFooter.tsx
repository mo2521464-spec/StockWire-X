import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  TrendingUp,
  Shield,
  Award,
} from "lucide-react";
import { useBrand } from "@/lib/brand-tokens";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SiteFooterProps {
  navLinks?: FooterSection[];
  seoLinks?: FooterLink[];
  socialIcons?: {
    platform: string;
    href: string;
    icon: React.ReactNode;
  }[];
  showNewsletter?: boolean;
  showContactInfo?: boolean;
}

const SiteFooter: React.FC<SiteFooterProps> = ({
  navLinks,
  seoLinks,
  socialIcons,
  showNewsletter = true,
  showContactInfo = true,
}) => {
  const brand = useBrand();

  // Default navigation sections
  const defaultNavLinks: FooterSection[] = navLinks || [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Our Team", href: "/team" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Content",
      links: [
        { label: "Market News", href: "/news" },
        { label: "Analysis", href: "/analysis" },
        { label: "Research Reports", href: "/research" },
        { label: "Video Content", href: "/videos" },
        { label: "Podcasts", href: "/podcasts" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Email Alerts", href: "/alerts" },
        { label: "Premium Membership", href: "/premium" },
        { label: "Corporate Services", href: "/corporate" },
        { label: "Advertising", href: "/advertise" },
        { label: "API Access", href: "/api" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Disclaimer", href: "/disclaimer" },
        { label: "Editorial Policy", href: "/editorial-policy" },
      ],
    },
  ];

  // Default SEO links
  const defaultSeoLinks: FooterLink[] = seoLinks || [
    { label: "ASX Tech News", href: "/sectors/technology" },
    { label: "ASX Biotech Announcements", href: "/sectors/biotechnology" },
    { label: "ASX Healthcare News", href: "/sectors/healthcare" },
    { label: "ASX Mining Updates", href: "/sectors/mining" },
    { label: "ASX Financial Services", href: "/sectors/financials" },
    { label: "ASX Industrial News", href: "/sectors/industrials" },
    { label: "Investor Relations Advertising", href: "/ir-advertising" },
    { label: "ASX Quarterly Results", href: "/tags/quarterly-results" },
    { label: "ASX M&A Activity", href: "/tags/mergers-acquisitions" },
    { label: "ASX Capital Raises", href: "/tags/capital-raises" },
    { label: "ASX IPO News", href: "/tags/ipo" },
    { label: "ASX Earnings Reports", href: "/tags/earnings" },
  ];

  // Default social media links
  const defaultSocialIcons = socialIcons || [
    {
      platform: "LinkedIn",
      href: "https://linkedin.com/company/stockwirex",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      platform: "Twitter/X",
      href: "https://x.com/stockwirex",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      platform: "YouTube",
      href: "https://youtube.com/@stockwirex",
      icon: <Youtube className="w-5 h-5" />,
    },
    {
      platform: "Facebook",
      href: "https://facebook.com/stockwirex",
      icon: <Facebook className="w-5 h-5" />,
    },
  ];

  const [newsletterEmail, setNewsletterEmail] = React.useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      // Handle newsletter signup
      console.log("Newsletter signup:", newsletterEmail);
      setNewsletterEmail("");
      alert("Thank you for subscribing!");
    }
  };

  return (
    <footer className="bg-navy-1 text-white">
      {/* Main Footer Content */}
      <div className="content-max-width content-padding section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-16 lg:grid-cols-6">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h3 className="font-heading text-3xl text-white mb-6">
                  {brand.name}
                </h3>
                <p className="font-body text-white/90 leading-relaxed text-lg">
                  {brand.essence}
                </p>
              </div>

              {/* Newsletter Signup */}
              {showNewsletter && (
                <div className="mb-8">
                  <h4 className="font-subheading text-xl text-white mb-4">
                    Stay Updated
                  </h4>
                  <form
                    onSubmit={handleNewsletterSubmit}
                    className="flex gap-3"
                  >
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 py-3 px-4 rounded-lg font-body transition-brand"
                    />
                    <Button
                      type="submit"
                      className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3 rounded-lg transition-brand hover-lift"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              )}

              {/* Social Media */}
              <div>
                <h4 className="font-subheading text-xl text-white mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {defaultSocialIcons.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 rounded-xl hover:bg-brand-orange transition-brand hover-lift focus-brand"
                      aria-label={`Follow us on ${social.platform}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            {defaultNavLinks.map((section, index) => (
              <div key={index} className="lg:col-span-1">
                <h4 className="font-subheading text-xl text-white mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="font-body text-white/80 hover:text-white hover:text-brand-gold transition-brand"
                        {...(link.external && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          {showContactInfo && (
            <div className="mt-16 pt-8 border-t border-white/20">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Mail className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <div className="font-subheading text-white/80 mb-1">
                      Email
                    </div>
                    <div className="font-body text-white text-lg">
                      contact@stockwirex.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Phone className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <div className="font-subheading text-sm text-white/70">
                      Phone
                    </div>
                    <div className="font-body text-white">+61 2 9000 0000</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <MapPin className="w-5 h-5 text-brand-orange" />
                  </div>
                  <div>
                    <div className="font-subheading text-sm text-white/70">
                      Location
                    </div>
                    <div className="font-body text-white">
                      Sydney, Australia
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEO Links Section */}
      <div className="bg-navy-2 py-12">
        <div className="content-max-width content-padding">
          <div className="max-w-6xl mx-auto">
            <h4 className="font-subheading text-lg text-white/80 mb-6 text-center">
              Popular ASX Categories & Topics
            </h4>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {defaultSeoLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="font-body text-white/70 hover:text-brand-orange transition-brand"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-navy-1 border-t border-white/10 py-8">
        <div className="content-max-width content-padding">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              {/* Copyright */}
              <div className="font-body text-white/70 text-center md:text-left">
                © {new Date().getFullYear()} {brand.name}. All rights reserved.
              </div>

              {/* Trust Badges */}
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2 text-sm text-white/70 font-body">
                  <Shield className="w-5 h-5 text-brand-orange" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-white/70 font-body">
                  <Award className="w-5 h-5 text-brand-gold" />
                  <span>Google Cloud Partner</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-white/70 font-body">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>Real-time Data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
