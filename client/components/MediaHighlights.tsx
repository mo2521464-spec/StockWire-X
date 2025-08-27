import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Play, Clock, Eye, ExternalLink, Volume2 } from "lucide-react";
import { useBrand } from "@/lib/brand-tokens";

interface MediaItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  viewCount: number;
  platform: "YouTube" | "TikTok" | "LinkedIn" | "Internal";
  embedUrl?: string;
  thumbnailUrl: string;
  publishedAt: string;
  author: string;
  tags: string[];
}

interface MediaHighlightsProps {
  items: MediaItem[];
  title?: string;
  showControls?: boolean;
}

const MediaHighlights: React.FC<MediaHighlightsProps> = ({
  items,
  title = "Market Analysis & Insights",
  showControls = true,
}) => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const brand = useBrand();

  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInDays = Math.floor(
      (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return `${Math.floor(diffInDays / 7)}w ago`;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "YouTube":
        return "bg-red-500";
      case "TikTok":
        return "bg-black";
      case "LinkedIn":
        return "bg-blue-600";
      default:
        return "bg-brand-orange";
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "YouTube":
        return "📺";
      case "TikTok":
        return "🎵";
      case "LinkedIn":
        return "💼";
      default:
        return "🎬";
    }
  };

  const handlePlayVideo = (item: MediaItem) => {
    setSelectedItem(item);
    // In a real app, this would open a modal or navigate to the video
    console.log("Playing video:", item.title);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-navy-1 mb-4">
              {title}
            </h2>
            <p className="font-body text-gray-600 max-w-2xl mx-auto">
              Stay informed with our latest video analysis, daily market wraps,
              and expert insights on ASX movements.
            </p>
          </div>

          {/* Video Carousel */}
          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {items.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <Card className="group cursor-pointer overflow-hidden border border-gray-700/10 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl">
                      <div className="relative">
                        {/* Thumbnail */}
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Play Overlay */}
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                            <Button
                              size="lg"
                              className="bg-white/90 hover:bg-white text-navy-1 rounded-full p-4 shadow-lg transform group-hover:scale-110 transition-all duration-300"
                              onClick={() => handlePlayVideo(item)}
                            >
                              <Play
                                className="w-6 h-6 ml-1"
                                fill="currentColor"
                              />
                            </Button>
                          </div>
                        </div>

                        {/* Platform Badge */}
                        <div className="absolute top-3 left-3">
                          <Badge
                            className={`${getPlatformColor(item.platform)} text-white border-0`}
                          >
                            <span className="mr-1">
                              {getPlatformIcon(item.platform)}
                            </span>
                            {item.platform}
                          </Badge>
                        </div>

                        {/* Duration */}
                        <div className="absolute bottom-3 right-3">
                          <Badge
                            variant="secondary"
                            className="bg-black/70 text-white border-0"
                          >
                            {item.duration}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="font-subheading text-lg mb-2 line-clamp-2 group-hover:text-brand-orange transition-colors duration-200">
                          {item.title}
                        </h3>
                        <p className="font-body text-gray-600 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>

                        {/* Metadata */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{formatViewCount(item.viewCount)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatTimeAgo(item.publishedAt)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Author */}
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-navy-1 text-sm">
                            By {item.author}
                          </span>
                          {item.embedUrl && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-brand-orange hover:bg-brand-orange/10"
                              onClick={() =>
                                window.open(item.embedUrl, "_blank")
                              }
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        {/* Tags */}
                        {item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100">
                            {item.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {showControls && (
                <>
                  <CarouselPrevious className="hidden lg:flex bg-white border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white" />
                  <CarouselNext className="hidden lg:flex bg-white border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white" />
                </>
              )}
            </Carousel>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="font-heading text-2xl text-brand-orange mb-2">
                25+
              </div>
              <div className="text-sm text-gray-600">Weekly Videos</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="font-heading text-2xl text-brand-orange mb-2">
                500K+
              </div>
              <div className="text-sm text-gray-600">Monthly Views</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="font-heading text-2xl text-brand-orange mb-2">
                50+
              </div>
              <div className="text-sm text-gray-600">Expert Analysts</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="font-heading text-2xl text-brand-orange mb-2">
                24/7
              </div>
              <div className="text-sm text-gray-600">Market Coverage</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Volume2 className="w-5 h-5 mr-2" />
              Subscribe for Daily Updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Example usage with mock data
export const MediaHighlightsWithData: React.FC = () => {
  const mockItems: MediaItem[] = [
    {
      id: "1",
      title: "Daily Market Wrap: ASX 200 Breaks New Record High",
      description:
        "Comprehensive analysis of today's market movements and what it means for your portfolio.",
      duration: "8:42",
      viewCount: 15420,
      platform: "YouTube",
      embedUrl: "https://youtube.com/watch?v=example1",
      thumbnailUrl: "/images/video1.jpg",
      publishedAt: "2024-01-15T17:30:00Z",
      author: "Marcus Chen",
      tags: ["Daily Wrap", "ASX 200", "Market Analysis"],
    },
    {
      id: "2",
      title: "Top 3 ASX Announcements This Week",
      description:
        "Quick breakdown of the most important announcements that moved markets this week.",
      duration: "3:15",
      viewCount: 8932,
      platform: "TikTok",
      embedUrl: "https://tiktok.com/@stockwirex/video/example2",
      thumbnailUrl: "/images/video2.jpg",
      publishedAt: "2024-01-15T12:00:00Z",
      author: "Sarah Williams",
      tags: ["Weekly Summary", "ASX Announcements"],
    },
    {
      id: "3",
      title: "Mining Sector Deep Dive: Commodity Outlook 2024",
      description:
        "Expert analysis on the mining sector outlook and key commodities to watch.",
      duration: "12:18",
      viewCount: 22100,
      platform: "LinkedIn",
      embedUrl: "https://linkedin.com/posts/stockwirex-example3",
      thumbnailUrl: "/images/video3.jpg",
      publishedAt: "2024-01-14T10:30:00Z",
      author: "David Thompson",
      tags: ["Mining", "Commodities", "Sector Analysis"],
    },
    {
      id: "4",
      title: "Biotech Breakthroughs: Investment Opportunities",
      description:
        "Exploring the latest developments in Australian biotech and investment potential.",
      duration: "6:30",
      viewCount: 12750,
      platform: "Internal",
      thumbnailUrl: "/images/video4.jpg",
      publishedAt: "2024-01-14T14:15:00Z",
      author: "Dr. Lisa Park",
      tags: ["Biotech", "Investment", "Healthcare"],
    },
  ];

  return <MediaHighlights items={mockItems} />;
};

export default MediaHighlights;
