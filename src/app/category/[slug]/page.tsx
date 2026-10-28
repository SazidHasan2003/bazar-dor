import ProductCard from "@/components/ProductCard";
import SortDropdown from "@/components/SortDropdown";
import Link from "next/link";

interface MarketItem {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: MarketItem[];
}

async function getCategoryProducts(categorySlug: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${categorySlug}`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) throw new Error("Failed to fetch category products");
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    return [];
  } catch (error) {
    console.error("Error fetching category products:", error);
    return [];
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const { sort = "default" } = await searchParams;

  const products = await getCategoryProducts(slug);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low-high") {
      return a.today - b.today;
    } else if (sort === "high-low") {
      return b.today - a.today;
    }
    return 0;
  });

  const categoryNameBn =
    products.length > 0 ? products[0].categoryNameBn : slug;
  const categoryIcon = products.length > 0 ? products[0].image : "📦";

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto space-y-6">
        {/* Top Header Banner Card */}
        <div className="bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <span className="text-4xl p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
            {categoryIcon}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              {categoryNameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              মোট {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Filter/Sort bar */}
        <div className="bg-[#FAFAFA] border border-gray-200/85 rounded-2xl p-4 shadow-sm flex items-center justify-between flex-wrap gap-4">
          <span className="text-sm text-gray-500 font-medium">
            মোট {products.length}টি পণ্য দেখানো হচ্ছে
          </span>

          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-gray-500 font-medium">
              সাজান
            </span>
            <SortDropdown defaultValue={sort} />
          </div>
        </div>

        {/* Product Cards Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                nameBn={product.nameBn}
                unit={product.unit}
                today={product.today}
                change={product.change}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FAFAFA] border border-gray-200 rounded-2xl">
            <p className="text-gray-500 text-base font-medium">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যায়নি।
            </p>
            <Link
              href="/"
              className="inline-block mt-4 text-sm text-[#008848] font-semibold hover:underline"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
