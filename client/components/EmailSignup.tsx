import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Mail,
  User,
  Phone,
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
} from "lucide-react";
import { useBrand } from "@/lib/brand-tokens";
import { useAnalytics } from "@/lib/analytics";

// Form validation schema
const emailSignupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  phone: z
    .string()
    .optional()
    .refine((phone) => {
      if (!phone) return true; // Optional field
      // Australian phone number regex (mobile and landline)
      const phoneRegex = /^(\+61|0)[2-9]\d{8}$/;
      return phoneRegex.test(phone.replace(/\s+/g, ""));
    }, "Please enter a valid Australian phone number"),
  privacyConsent: z
    .boolean()
    .refine(
      (val) => val === true,
      "You must agree to the Privacy Policy to continue",
    ),
  marketingConsent: z.boolean().optional(),
});

type EmailSignupFormData = z.infer<typeof emailSignupSchema>;

interface EmailSignupProps {
  variant?: "inline" | "modal" | "standalone";
  onSubmit?: (data: EmailSignupFormData) => void;
  title?: string;
  subtitle?: string;
  credibilityText?: string;
  showFeatures?: boolean;
  className?: string;
}

const EmailSignup: React.FC<EmailSignupProps> = ({
  variant = "inline",
  onSubmit,
  title = "Get Breaking ASX Alerts Direct to Your Inbox.",
  subtitle = "Join 250,000+ monthly readers.",
  credibilityText,
  showFeatures = true,
  className = "",
}) => {
  const brand = useBrand();
  const { trackNewsletterSignup } = useAnalytics();

  const form = useForm<EmailSignupFormData>({
    resolver: zodResolver(emailSignupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      privacyConsent: false,
      marketingConsent: true,
    },
  });

  const handleSubmit = async (data: EmailSignupFormData) => {
    try {
      // Track analytics event
      trackNewsletterSignup("homepage", variant);

      // In a real app, this would make an API call
      console.log("Form submitted:", data);

      if (onSubmit) {
        onSubmit(data);
      }

      // Show success state
      alert("Thank you! You have been successfully subscribed to our alerts.");
      form.reset();
    } catch (error) {
      console.error("Subscription error:", error);
      // Handle error state
    }
  };

  const features = [
    { text: "Breaking ASX announcements within 30 seconds", icon: "⚡" },
    { text: "Daily market wrap and analysis", icon: "📊" },
    { text: "Sector-specific insights and trends", icon: "🎯" },
    { text: "No spam, unsubscribe anytime", icon: "🛡️" },
  ];

  if (variant === "standalone") {
    return (
      <section
        className={`section-padding bg-gradient-to-br from-navy-1 to-navy-2 ${className}`}
      >
        <div className="content-max-width content-padding">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Content */}
              <div className="text-white">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-8">
                  {title}
                </h2>
                <p className="font-subheading text-2xl text-white/95 mb-8">
                  {subtitle}
                </p>
                {credibilityText && (
                  <p className="font-body text-white/80 mb-8">
                    {credibilityText}
                  </p>
                )}

                {showFeatures && (
                  <div className="space-y-6 mb-10">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <span className="text-3xl">{feature.icon}</span>
                        <span className="font-body text-white/90 text-lg">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-8 text-base text-white/80 font-body">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span>4.8/5 Rating</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="font-accent text-brand-gold">250K+</span>
                    <span>Subscribers</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <Card className="bg-white shadow-2xl border-0 rounded-2xl">
                <CardContent className="p-10">
                  <EmailSignupForm
                    form={form}
                    onSubmit={handleSubmit}
                    variant="compact"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "inline") {
    return (
      <section className={`section-padding bg-gray-50/50 ${className}`}>
        <div className="content-max-width content-padding">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-heading text-3xl md:text-4xl text-navy-1 mb-6">
              {title}
            </h3>
            <p className="font-subheading text-xl text-gray-600 mb-10">
              {subtitle}
            </p>
            <EmailSignupForm
              form={form}
              onSubmit={handleSubmit}
              variant="inline"
            />
          </div>
        </div>
      </section>
    );
  }

  // Modal variant would be rendered in a dialog/modal context
  return (
    <div className={`p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="font-heading text-xl md:text-2xl text-navy-1 mb-2">
          {title}
        </h3>
        <p className="font-body text-gray-600">{subtitle}</p>
      </div>
      <EmailSignupForm form={form} onSubmit={handleSubmit} variant="modal" />
    </div>
  );
};

// Separate form component for reusability
interface EmailSignupFormProps {
  form: any;
  onSubmit: (data: EmailSignupFormData) => void;
  variant: "inline" | "modal" | "compact";
}

const EmailSignupForm: React.FC<EmailSignupFormProps> = ({
  form,
  onSubmit,
  variant,
}) => {
  const brand = useBrand();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-subheading text-navy-1 text-base mb-2">
                Full Name *
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-brand-orange" />
                  <Input
                    {...field}
                    placeholder="Enter your full name"
                    className="pl-12 pr-4 py-4 text-lg font-body border-navy-1/20 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 rounded-xl transition-brand"
                  />
                </div>
              </FormControl>
              <FormMessage className="font-body text-sm" />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-subheading text-navy-1 text-base mb-2">
                Email Address *
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-brand-orange" />
                  <Input
                    {...field}
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-12 pr-4 py-4 text-lg font-body border-navy-1/20 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 rounded-xl transition-brand"
                  />
                </div>
              </FormControl>
              <FormMessage className="font-body text-sm" />
            </FormItem>
          )}
        />

        {/* Phone Field - Optional */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-subheading text-navy-1 text-base mb-2">
                Phone Number (Optional)
              </FormLabel>
              <FormControl>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-brand-orange" />
                  <Input
                    {...field}
                    placeholder="+61 4XX XXX XXX"
                    className="pl-12 pr-4 py-4 text-lg font-body border-navy-1/20 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 rounded-xl transition-brand"
                  />
                </div>
              </FormControl>
              <FormDescription className="text-sm text-gray-500 font-body mt-2">
                Australian phone number for SMS alerts (optional)
              </FormDescription>
              <FormMessage className="font-body text-sm" />
            </FormItem>
          )}
        />

        {/* Privacy Consent - Required */}
        <FormField
          control={form.control}
          name="privacyConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1 border-brand-orange data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-body text-sm text-navy-1 cursor-pointer">
                  I agree to the{" "}
                  <a
                    href="/privacy-policy"
                    className="text-brand-orange hover:underline"
                    target="_blank"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="/terms-of-service"
                    className="text-brand-orange hover:underline"
                    target="_blank"
                  >
                    Terms of Service
                  </a>
                  . *
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Marketing Consent - Optional */}
        <FormField
          control={form.control}
          name="marketingConsent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1 border-brand-orange data-[state=checked]:bg-brand-orange data-[state=checked]:border-brand-orange"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="font-body text-sm text-gray-600 cursor-pointer">
                  I would like to receive marketing communications and special
                  offers
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-subheading py-5 text-xl rounded-xl shadow-brand-lg hover:shadow-2xl transition-brand hover-lift focus-brand group"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              RECEIVE ALERTS
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </>
          )}
        </Button>

        {/* Security & Privacy Notice */}
        <div className="flex items-center justify-center space-x-3 text-sm text-gray-500 pt-4 font-body">
          <Shield className="w-5 h-5 text-brand-orange" />
          <span>Your data is secure and never shared with third parties</span>
        </div>
      </form>
    </Form>
  );
};

export default EmailSignup;
