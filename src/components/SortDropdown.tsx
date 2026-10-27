"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortDropdown({
  defaultValue,
}: {
  defaultValue: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortValue);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative">
      <select
        defaultValue={defaultValue}
        onChange={handleSortChange}
        className="appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 pr-8 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#008848] cursor-pointer"
      >
        <option value="default">ডিফল্ট</option>
        <option value="low-high">দাম: কম থেকে বেশি</option>
        <option value="high-low">দাম: বেশি থেকে কম</option>
      </select>
      {/* Chevron Icon */}
      <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
