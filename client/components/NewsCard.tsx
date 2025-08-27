import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Eye, ArrowUpRight } from "lucide-react";
import { useBrand } from "@/lib/brand-tokens";

interface NewsCardProps {
  variant?: "compact" | "feature";
  title: string;
  excerpt?: string;
  author?: string;
  publishedAt: string;
  sector: string;
  tags: string[];
  ticker?: string[];
  coverImage?: string;
  viewCount?: number;
  sourceType: "ASX" | "Editorial";
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({
  variant = "compact",
  title,
  excerpt,
  author,
  publishedAt,
  sector,
  tags,
  ticker = [],
  coverImage,
  viewCount,
  sourceType,
  onClick,
}) => {
  const brand = useBrand();

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInMinutes = Math.floor(
      (now.getTime() - published.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  if (variant === "feature") {
    return (
      <Card
        className="group cursor-pointer hover:shadow-2xl transition-brand overflow-hidden border-0 bg-white shadow-brand-lg hover-lift rounded-2xl"
        onClick={onClick}
      >
        <div className="relative">
          {coverImage && (
            <div className="aspect-video overflow-hidden rounded-t-2xl">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="absolute top-6 left-6">
            <Badge
              variant="secondary"
              className={`${sourceType === "ASX" ? "bg-brand-orange text-white" : "bg-navy-1 text-white"} font-subheading px-4 py-2 rounded-lg shadow-brand`}
            >
              {sourceType}
            </Badge>
          </div>
        </div>
        <CardContent className="p-8">
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge
              variant="outline"
              className="text-sm border-navy-1/20 text-navy-1 font-body px-3 py-1"
            >
              {sector}
            </Badge>
            {ticker.map((t, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-sm border-brand-orange/30 text-brand-orange font-body px-3 py-1"
              >
                {t}
              </Badge>
            ))}
          </div>
          <h3 className="font-heading text-2xl mb-4 line-clamp-2 group-hover:text-brand-orange transition-brand text-navy-1">
            {title}
          </h3>
          {excerpt && (
            <p className="font-body text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed">
              {excerpt}
            </p>
          )}
          <div className="flex items-center justify-between text-base text-gray-500 font-body">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{formatTimeAgo(publishedAt)}</span>
              </div>
              {viewCount && (
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>{viewCount.toLocaleString()}</span>
                </div>
              )}
            </div>
            {author && (
              <span className="font-subheading text-navy-1">By {author}</span>
            )}
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-lg font-body"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Compact variant
  return (
    <Card
      className="group cursor-pointer hover:shadow-xl transition-brand border-l-4 border-l-brand-orange/30 hover:border-l-brand-orange bg-white shadow-brand hover-lift rounded-xl"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-5">
          {coverImage && (
            <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge
                variant="secondary"
                className={`${sourceType === "ASX" ? "bg-brand-orange text-white" : "bg-navy-1 text-white"} text-xs font-body px-2 py-1`}
              >
                {sourceType}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs border-navy-1/20 text-navy-1 font-body px-2 py-1"
              >
                {sector}
              </Badge>
              {ticker.slice(0, 2).map((t, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs border-brand-orange/30 text-brand-orange font-body px-2 py-1"
                >
                  {t}
                </Badge>
              ))}
            </div>
            <h3 className="font-subheading text-lg md:text-xl mb-3 line-clamp-2 group-hover:text-brand-orange transition-brand text-navy-1">
              {title}
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-500 font-body">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimeAgo(publishedAt)}</span>
                </div>
                {viewCount && (
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span>{viewCount.toLocaleString()}</span>
                  </div>
                )}
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-brand-orange transition-brand" />
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded font-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
