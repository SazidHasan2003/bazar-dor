import ProductCard from "./ProductCard";

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

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function MarketSections() {
  const products = await getProducts();

  const topRisers = [...products]
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const topFallers = [...products]
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8 space-y-12 bg-white">
      {topRisers.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>আজ দাম বেড়েছে</span>
              <span className="text-red-600 text-lg">▲</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              গতদিনের তুলনায় যে পণ্যগুলোর দাম বৃদ্ধি পেয়েছে
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {topRisers.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      )}

      {topFallers.length > 0 && (
        <section>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span>আজ দাম কমেছে</span>
              <span className="text-[#008848] text-lg">▼</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              গতদিনের তুলনায় যে পণ্যগুলোর দাম হ্রাস পেয়েছে
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {topFallers.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            সব পণ্য
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস ও অন্যান্য নিত্যপ্রয়োজনীয় পণ্যের
            বর্তমান বাজারদর
          </p>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-500 text-base font-medium">
            ডাটা পাওয়া যায় নি
          </div>
        )}
      </section>
    </div>
  );
}
