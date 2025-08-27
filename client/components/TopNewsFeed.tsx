import React, { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, SortDesc } from "lucide-react";
import NewsCard from "./NewsCard";
import { useBrand } from "@/lib/brand-tokens";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  sector: string;
  tags: string[];
  ticker: string[];
  coverImage?: string;
  sourceType: "ASX" | "Editorial";
  viewCount: number;
  popularityScore: number;
}

interface TopNewsFeedProps {
  initialSector?: string;
  tagFilters?: string[];
  pagination?: boolean;
  onFilterChange?: (sector: string, tags: string[], sort: string) => void;
}

const TopNewsFeed: React.FC<TopNewsFeedProps> = ({
  initialSector = "all",
  tagFilters = [
    "Quarterly Results",
    "M&A",
    "Capital Raises",
    "Earnings",
    "Acquisitions",
    "IPO",
  ],
  pagination = true,
  onFilterChange,
}) => {
  const [selectedSector, setSelectedSector] = useState(initialSector);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const brand = useBrand();

  // Mock data - in a real app, this would come from an API
  const mockArticles: Article[] = [
    {
      id: "1",
      title: "ASX Tech Giants Report Strong Q3 Results Amid Market Volatility",
      excerpt:
        "Major technology companies on the ASX have delivered robust quarterly results, defying broader market concerns about economic headwinds.",
      author: "Sarah Chen",
      publishedAt: "2024-01-15T10:30:00Z",
      sector: "Tech",
      tags: ["Quarterly Results", "Earnings"],
      ticker: ["TLS", "REA", "XRO"],
      coverImage: "/api/placeholder/400/240",
      sourceType: "Editorial",
      viewCount: 15420,
      popularityScore: 95,
    },
    {
      id: "2",
      title:
        "Biotech Breakthrough: New Cancer Treatment Shows Promise in Clinical Trials",
      excerpt:
        "A leading Australian biotech company announces positive results from Phase II trials for its innovative cancer therapy.",
      author: "Dr. Michael Wong",
      publishedAt: "2024-01-15T09:15:00Z",
      sector: "Biotech",
      tags: ["Clinical Trials", "Healthcare Innovation"],
      ticker: ["CSL", "SYR"],
      coverImage: "/api/placeholder/400/240",
      sourceType: "Editorial",
      viewCount: 8932,
      popularityScore: 88,
    },
    {
      id: "3",
      title: "Major Mining Acquisition Reshapes Australian Resources Sector",
      excerpt:
        "Industry consolidation continues as one of Australia's largest mining companies announces a $2.5B acquisition deal.",
      author: "James Mitchell",
      publishedAt: "2024-01-15T08:45:00Z",
      sector: "Industrials",
      tags: ["M&A", "Acquisitions"],
      ticker: ["BHP", "RIO", "FMG"],
      coverImage: "/api/placeholder/400/240",
      sourceType: "ASX",
      viewCount: 12750,
      popularityScore: 92,
    },
    {
      id: "4",
      title: "Healthcare Stocks Rally on Government Funding Announcement",
      excerpt:
        "The healthcare sector surges following the government's announcement of increased funding for medical research and infrastructure.",
      author: "Emma Thompson",
      publishedAt: "2024-01-15T07:20:00Z",
      sector: "Healthcare",
      tags: ["Government Policy", "Sector Rally"],
      ticker: ["COH", "RHC", "PME"],
      coverImage: "/api/placeholder/400/240",
      sourceType: "Editorial",
      viewCount: 6543,
      popularityScore: 78,
    },
    {
      id: "5",
      title:
        "Banking Sector Faces Headwinds as Interest Rate Speculation Grows",
      excerpt:
        "Financial institutions prepare for potential monetary policy changes as economic indicators point to shifting interest rate environment.",
      author: "Robert Zhang",
      publishedAt: "2024-01-15T06:30:00Z",
      sector: "Financials",
      tags: ["Interest Rates", "Banking"],
      ticker: ["CBA", "ANZ", "WBC", "NAB"],
      coverImage: "/api/placeholder/400/240",
      sourceType: "Editorial",
      viewCount: 9876,
      popularityScore: 85,
    },
    {
      id: "6",
      title: "Renewable Energy IPO Oversubscribed by 400% on Market Debut",
      excerpt:
        "Strong investor appetite for clean energy drives massive oversubscription for the latest renewable energy company to list on the ASX.",
      author: "Lisa Park",
      publishedAt: "2024-01-14T16:45:00Z",
      sector: "Tech",
      tags: ["IPO", "Capital Raises", "Clean Energy"],
      ticker: ["ORG", "GNX"],
      coverImage: "/api/placeholder/400/240",
      sourceType: "ASX",
      viewCount: 11234,
      popularityScore: 90,
    },
  ];

  const sectors = [
    { value: "all", label: "All News" },
    { value: "Tech", label: "Technology" },
    { value: "Biotech", label: "Biotechnology" },
    { value: "Healthcare", label: "Healthcare" },
    { value: "Industrials", label: "Industrials" },
    { value: "Financials", label: "Financials" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "most-read", label: "Most Read" },
    { value: "trending", label: "Trending" },
  ];

  const filteredAndSortedArticles = useMemo(() => {
    let filtered = mockArticles;

    // Filter by sector
    if (selectedSector !== "all") {
      filtered = filtered.filter(
        (article) => article.sector === selectedSector,
      );
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((article) =>
        selectedTags.some((tag) => article.tags.includes(tag)),
      );
    }

    // Sort articles
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "most-read":
          return b.viewCount - a.viewCount;
        case "trending":
          return b.popularityScore - a.popularityScore;
        case "newest":
        default:
          return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
          );
      }
    });

    return sorted;
  }, [selectedSector, selectedTags, sortBy]);

  const handleSectorChange = (sector: string) => {
    setSelectedSector(sector);
    if (onFilterChange) {
      onFilterChange(sector, selectedTags, sortBy);
    }
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    if (onFilterChange) {
      onFilterChange(selectedSector, newTags, sortBy);
    }
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    if (onFilterChange) {
      onFilterChange(selectedSector, selectedTags, newSort);
    }
  };

  return (
    <section className="section-padding bg-gray-50/50">
      <div className="content-max-width content-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div className="mb-6 lg:mb-0">
              <h2 className="font-heading text-4xl md:text-5xl text-navy-1 mb-4">
                Latest Market News
              </h2>
              <p className="font-body text-xl text-gray-600 max-w-2xl">
                Stay updated with real-time ASX announcements and market
                analysis
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 border-navy-1/20 text-navy-1 hover:bg-navy-1 hover:text-white transition-brand font-subheading"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </Button>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-52 border-navy-1/20 focus:border-brand-orange focus:ring-brand-orange/20 font-body">
                  <SortDesc className="w-4 h-4 mr-2 text-navy-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-navy-1/20">
                  {sortOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="font-body"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Sector Tabs */}
          <Tabs
            value={selectedSector}
            onValueChange={handleSectorChange}
            className="mb-8"
          >
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-white border border-navy-1/10 shadow-brand rounded-xl p-2">
              {sectors.map((sector) => (
                <TabsTrigger
                  key={sector.value}
                  value={sector.value}
                  className="data-[state=active]:bg-brand-orange data-[state=active]:text-white font-subheading text-navy-1 rounded-lg transition-brand hover:bg-brand-orange/10"
                >
                  {sector.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Tag Filters */}
          {showFilters && (
            <div className="mb-8 p-6 bg-white rounded-xl border border-navy-1/10 shadow-brand">
              <h3 className="font-subheading text-lg text-navy-1 mb-4">
                Filter by Topic:
              </h3>
              <div className="flex flex-wrap gap-3">
                {tagFilters.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-brand font-body px-4 py-2 rounded-lg ${
                      selectedTags.includes(tag)
                        ? "bg-brand-orange text-white hover:bg-brand-orange/90 shadow-brand"
                        : "border-navy-1/20 text-navy-1 hover:bg-brand-orange hover:text-white hover:border-brand-orange"
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              {selectedTags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTags([])}
                  className="mt-4 text-gray-500 hover:text-navy-1 font-body"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          )}

          {/* News Feed */}
          <div className="space-y-8">
            {/* Featured Article */}
            {filteredAndSortedArticles.length > 0 && (
              <div className="mb-12">
                <NewsCard
                  variant="feature"
                  {...filteredAndSortedArticles[0]}
                  onClick={() =>
                    console.log(
                      "Navigate to article:",
                      filteredAndSortedArticles[0].id,
                    )
                  }
                />
              </div>
            )}

            {/* Article Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedArticles.slice(1).map((article) => (
                <NewsCard
                  key={article.id}
                  variant="compact"
                  {...article}
                  onClick={() =>
                    console.log("Navigate to article:", article.id)
                  }
                />
              ))}
            </div>

            {/* Load More */}
            {pagination && filteredAndSortedArticles.length > 0 && (
              <div className="text-center pt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-subheading px-10 py-4 rounded-xl transition-brand hover-lift"
                >
                  Load More Articles
                </Button>
              </div>
            )}
          </div>

          {/* Empty State */}
          {filteredAndSortedArticles.length === 0 && (
            <div className="text-center py-16">
              <h3 className="font-heading text-2xl text-navy-1 mb-4">
                No articles found
              </h3>
              <p className="font-body text-gray-600 mb-6 text-lg">
                Try adjusting your filters or check back later for new content.
              </p>
              <Button
                onClick={() => {
                  setSelectedSector("all");
                  setSelectedTags([]);
                }}
                variant="outline"
                className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-subheading transition-brand"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopNewsFeed;
