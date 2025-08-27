import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
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
}

interface CategoryBlockProps {
  sector: string;
  seeAllHref: string;
  articles: Article[];
  icon?: React.ReactNode;
  description?: string;
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({
  sector,
  seeAllHref,
  articles,
  icon,
  description,
}) => {
  const brand = useBrand();

  // Sector color mapping
  const sectorColors: Record<string, string> = {
    Tech: "from-blue-500 to-purple-600",
    Biotech: "from-green-500 to-teal-600",
    Healthcare: "from-red-500 to-pink-600",
    Industrials: "from-orange-500 to-yellow-600",
    Financials: "from-indigo-500 to-blue-600",
  };

  const sectorIcons: Record<string, React.ReactNode> = {
    Tech: "💻",
    Biotech: "🧬",
    Healthcare: "🏥",
    Industrials: "🏭",
    Financials: "🏦",
  };

  const defaultIcon = icon || sectorIcons[sector] || (
    <TrendingUp className="w-6 h-6" />
  );
  const gradientClass =
    sectorColors[sector] || "from-brand-orange to-brand-gold";

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Category Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${gradientClass} text-white shadow-lg`}
              >
                {typeof defaultIcon === "string" ? (
                  <span className="text-2xl">{defaultIcon}</span>
                ) : (
                  defaultIcon
                )}
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl text-navy-1">
                  {sector} News
                </h2>
                {description && (
                  <p className="font-body text-gray-600 mt-1">{description}</p>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              className="hidden md:flex items-center space-x-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors duration-200"
              onClick={() => (window.location.href = seeAllHref)}
            >
              <span>See All {sector}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Featured Article - Full Width on Mobile, 2/3 on Desktop */}
            <div className="lg:col-span-2">
              <NewsCard
                variant="feature"
                {...articles[0]}
                onClick={() =>
                  console.log("Navigate to article:", articles[0].id)
                }
              />
            </div>

            {/* Side Articles */}
            <div className="space-y-6">
              {articles.slice(1, 3).map((article, index) => (
                <NewsCard
                  key={article.id}
                  variant="compact"
                  {...article}
                  onClick={() =>
                    console.log("Navigate to article:", article.id)
                  }
                />
              ))}

              {/* Mobile See All Button */}
              <div className="md:hidden">
                <Button
                  variant="outline"
                  className="w-full border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white transition-colors duration-200"
                  onClick={() => (window.location.href = seeAllHref)}
                >
                  <span>See All {sector} News</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Articles Row (if more than 3 articles) */}
          {articles.length > 3 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              {articles.slice(3, 6).map((article) => (
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
          )}

          {/* Performance Metrics (Optional) */}
          <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="font-heading text-2xl text-navy-1">
                  {articles
                    .reduce((sum, article) => sum + article.viewCount, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              <div>
                <div className="font-heading text-2xl text-navy-1">
                  {articles.length}
                </div>
                <div className="text-sm text-gray-600">Recent Articles</div>
              </div>
              <div>
                <div className="font-heading text-2xl text-navy-1">
                  {new Set(articles.flatMap((a) => a.ticker)).size}
                </div>
                <div className="text-sm text-gray-600">Companies Covered</div>
              </div>
              <div>
                <div className="font-heading text-2xl text-brand-orange">
                  {Math.round(
                    articles.reduce(
                      (sum, article) => sum + article.viewCount,
                      0,
                    ) /
                      articles.length /
                      1000,
                  )}
                  K
                </div>
                <div className="text-sm text-gray-600">Avg. Views</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Example usage component with predefined category blocks
export const CategoryBlockSection: React.FC = () => {
  // Mock data for different sectors
  const sectorData = {
    Tech: [
      {
        id: "tech-1",
        title: "AI Revolution Transforms Australian Fintech Landscape",
        excerpt:
          "Leading fintech companies are leveraging artificial intelligence to create innovative solutions for the Australian market.",
        author: "Alex Johnson",
        publishedAt: "2024-01-15T10:30:00Z",
        sector: "Tech",
        tags: ["AI", "Fintech", "Innovation"],
        ticker: ["XRO", "APT", "Z1P"],
        coverImage: "/images/block1.jpg",
        sourceType: "Editorial" as const,
        viewCount: 8543,
      },
      {
        id: "tech-2",
        title: "Cloud Computing Stocks Surge on Enterprise Adoption",
        excerpt:
          "Australian cloud service providers see increased demand as enterprises accelerate digital transformation initiatives.",
        author: "Maria Santos",
        publishedAt: "2024-01-15T09:15:00Z",
        sector: "Tech",
        tags: ["Cloud Computing", "Enterprise"],
        ticker: ["TNE", "NXT"],
        coverImage: "/images/block2.jpg",
        sourceType: "Editorial" as const,
        viewCount: 5432,
      },
      {
        id: "tech-3",
        title: "Cybersecurity Firms Report Record Growth",
        excerpt:
          "Australian cybersecurity companies benefit from increased global awareness of digital security threats.",
        author: "David Kim",
        publishedAt: "2024-01-15T08:45:00Z",
        sector: "Tech",
        tags: ["Cybersecurity", "Growth"],
        ticker: ["TNE"],
        sourceType: "ASX" as const,
        viewCount: 3210,
      },
    ],
    Biotech: [
      {
        id: "biotech-1",
        title: "Gene Therapy Breakthrough Shows Promise for Rare Diseases",
        excerpt:
          "Australian researchers achieve significant milestone in gene therapy development for treating rare genetic disorders.",
        author: "Dr. Sarah Wilson",
        publishedAt: "2024-01-15T11:00:00Z",
        sector: "Biotech",
        tags: ["Gene Therapy", "Clinical Trials"],
        ticker: ["CSL", "SYR", "IMU"],
        coverImage: "/images/block3.jpg",
        sourceType: "Editorial" as const,
        viewCount: 7234,
      },
      {
        id: "biotech-2",
        title: "Pharmaceutical Partnership Drives Innovation",
        excerpt:
          "Major pharmaceutical alliance formed to accelerate drug discovery and development processes.",
        author: "Prof. Michael Chen",
        publishedAt: "2024-01-15T10:20:00Z",
        sector: "Biotech",
        tags: ["Partnerships", "Drug Development"],
        ticker: ["CSL", "COH"],
        sourceType: "ASX" as const,
        viewCount: 4567,
      },
    ],
  };

  return (
    <div className="space-y-16">
      {Object.entries(sectorData).map(([sector, articles]) => (
        <CategoryBlock
          key={sector}
          sector={sector}
          seeAllHref={`/sectors/${sector.toLowerCase()}`}
          articles={articles}
          description={
            sector === "Tech"
              ? "Latest developments in Australian technology and innovation"
              : sector === "Biotech"
                ? "Breakthrough discoveries and clinical developments"
                : undefined
          }
        />
      ))}
    </div>
  );
};

export default CategoryBlock;
