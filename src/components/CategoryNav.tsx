"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoryNavProps {
  categories: Category[];
}

export default function CategoryNav({ categories }: CategoryNavProps) {
  const pathname = usePathname();

  return (
    <nav className="py-3 overflow-x-auto scrollbar-none">
      {categories.length > 0 ? (
        <ul className="flex items-center gap-6 sm:gap-8 whitespace-nowrap min-w-max">
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;

            return (
              <li key={cat.id}>
                <Link
                  href={`/category/${cat.slug}`}
                  className={`flex items-center gap-2 text-sm sm:text-base font-medium transition-all px-3 py-1.5 rounded-xl ${
                    isActive
                      ? "bg-[#008848] text-white shadow-sm font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-transparent"
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
  );
}
