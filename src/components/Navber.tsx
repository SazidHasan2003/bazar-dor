import Image from "next/image";
import Link from "next/link";
import PriceTicker from "./PriceTicker";
import CurrentDate from "./CurrentDate";
import NavAuthMenu from "./NavAuthMenu";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

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
    dir: "up" | "down";
    pct: number;
  };
  markets: MarketItem[];
}

// Fetch Categories
async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Fetch Products for Ticker
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

export default async function Navbar() {
  const categories = await getCategories();
  const products = await getProducts();

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo & Bangla Date with Link to Home */}
          <Link
            href="/"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#008848] flex items-center justify-center overflow-hidden shadow-sm shrink-0 group-hover:opacity-95 transition-opacity">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight group-hover:text-[#008848] transition-colors">
                বাজার দর
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium capitalize">
                <CurrentDate />
              </p>
            </div>
          </Link>

          <NavAuthMenu />
        </div>
      </div>

      <div className="border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4">
          <nav className="py-3 overflow-x-auto scrollbar-none">
            {categories.length > 0 ? (
              <ul className="flex items-center gap-6 sm:gap-8 whitespace-nowrap min-w-max">
                {categories.map((cat, index) => {
                  const isActive = index === 0;

                  return (
                    <li key={cat.id || index}>
                      <Link
                        href={`/category/${cat.slug}`}
                        className={`flex items-center gap-2 text-sm sm:text-base font-medium transition-all pb-1 border-b-2 ${
                          isActive
                            ? "text-gray-900 border-[#008848] font-semibold"
                            : "text-gray-600 border-transparent hover:text-gray-900"
                        }`}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span>{cat.nameBn}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="py-2 text-center text-gray-500 text-sm font-medium">
                ডাটা পাওয়া যায় নি
              </div>
            )}
          </nav>
        </div>
      </div>

      <PriceTicker products={products} />
    </header>
  );
}
