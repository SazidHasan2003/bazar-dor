import Link from "next/link";
import { notFound } from "next/navigation";

interface MarketItem {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface ProductDetail {
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

async function getProductDetail(id: string): Promise<ProductDetail | null> {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
      {
        next: { revalidate: 0 },
      },
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.data) return data.data;
    if (data?.id) return data;
    return null;
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductDetail(id);

  if (!product) {
    notFound();
  }

  const formatNumber = (num: number) => num.toLocaleString("bn-BD");

  const getUnitBn = (u: string) => {
    switch (u) {
      case "kg":
        return "কেজি";
      case "litre":
        return "লিটার";
      case "dozen":
        return "ডজন";
      case "piece":
        return "পিস";
      case "gram":
        return "১০০ গ্রাম";
      default:
        return u;
    }
  };

  const allMins = product.markets.map((m) => m.min);
  const allMaxs = product.markets.map((m) => m.max);
  const absoluteMin = Math.min(...allMins);
  const absoluteMax = Math.max(...allMaxs);

  const minMarketObj = product.markets.find((m) => m.min === absoluteMin);
  const maxMarketObj = product.markets.find((m) => m.max === absoluteMax);

  const avgPrices = product.markets.map((m) => (m.min + m.max) / 2);
  const overallAvg = Math.round(
    avgPrices.reduce((acc, curr) => acc + curr, 0) / product.markets.length,
  );

  const isUp = product.change.dir === "up";
  const diffAmount = Math.abs(product.today - product.yesterday);

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-gray-900">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-gray-900"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="text-gray-900 font-medium">{product.nameBn}</span>
        </div>

        <div className="bg-[#FAFAFA] border border-gray-200/85 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl p-4 bg-white rounded-2xl shadow-sm border border-gray-100 shrink-0">
              {product.image}
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                প্রতি {getUnitBn(product.unit)} • {product.categoryNameBn}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
                গতকালের তুলনায় আজ দাম{" "}
                <span
                  className={
                    isUp ? "text-red-600 font-bold" : "text-[#008848] font-bold"
                  }
                >
                  {isUp ? "বেড়েছে" : "কমেছে"} {formatNumber(diffAmount)} টাকা
                </span>
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-4 text-center min-w-[160px] shadow-sm self-stretch md:self-auto flex flex-col justify-center">
            <span className="text-xs text-gray-400 font-medium block">
              আজকের দাম
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 my-0.5">
              {formatNumber(product.today)}
            </span>
            <span className="text-xs text-gray-500">
              টাকা / {getUnitBn(product.unit)}
            </span>
            <div
              className={`mt-2 inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${
                isUp ? "text-red-600 bg-red-50" : "text-[#008848] bg-green-50"
              }`}
            >
              <span>{isUp ? "▲" : "▼"}</span>
              <span>{Math.abs(product.change.pct)}%</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#FAFAFA] border border-gray-200/85 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium block">
                সর্বনিম্ন দাম
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-[#008848]">
                {formatNumber(absoluteMin)} টাকা
              </div>
              <p className="text-xs text-gray-500 pt-1">
                সবচেয়ে কম দামের বাজার:{" "}
                <span className="font-semibold text-gray-800">
                  {minMarketObj?.market}
                </span>
              </p>
            </div>

            <div className="bg-[#FAFAFA] border border-gray-200/85 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium block">
                সর্বাধিক দাম
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-red-600">
                {formatNumber(absoluteMax)} টাকা
              </div>
              <p className="text-xs text-gray-500 pt-1">
                সবচেয়ে বেশি দামের বাজার:{" "}
                <span className="font-semibold text-gray-800">
                  {maxMarketObj?.market}
                </span>
              </p>
            </div>

            <div className="bg-[#FAFAFA] border border-gray-200/85 rounded-2xl p-5 shadow-sm space-y-1">
              <span className="text-xs text-gray-500 font-medium block">
                গড় দাম
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-gray-900">
                {formatNumber(overallAvg)} টাকা
              </div>
              <p className="text-xs text-gray-500 pt-1">
                প্রতি {getUnitBn(product.unit)}-এর হিসাবে
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="bg-[#FAFAFA] border border-gray-200/85 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50 text-xs sm:text-sm text-gray-500 font-semibold">
                    <th className="py-3.5 px-4 sm:px-6">বাজার</th>
                    <th className="py-3.5 px-4 sm:px-6">বিভাগ</th>
                    <th className="py-3.5 px-4 sm:px-6">সর্বনিম্ন</th>
                    <th className="py-3.5 px-4 sm:px-6">সর্বাধিক</th>
                    <th className="py-3.5 px-4 sm:px-6">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-gray-800 font-medium">
                  {product.markets.map((item, index) => {
                    const avgMarketPrice = Math.round(
                      (item.min + item.max) / 2,
                    );
                    return (
                      <tr
                        key={index}
                        className="hover:bg-white/80 transition-colors"
                      >
                        <td className="py-4 px-4 sm:px-6 font-semibold text-gray-900">
                          {item.market}
                        </td>
                        <td className="py-4 px-4 sm:px-6 text-gray-600">
                          {item.division}
                        </td>
                        <td className="py-4 px-4 sm:px-6">
                          {formatNumber(item.min)} টাকা
                        </td>
                        <td className="py-4 px-4 sm:px-6">
                          {formatNumber(item.max)} টাকা
                        </td>
                        <td className="py-4 px-4 sm:px-6 font-bold text-gray-900">
                          {formatNumber(avgMarketPrice)} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
