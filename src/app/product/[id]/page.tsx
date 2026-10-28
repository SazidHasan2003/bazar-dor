"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: session, isPending: isSessionPending } =
    authClient.useSession();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSessionPending && !session) {
      router.push("/sign-in");
      return;
    }

    if (session && id) {
      async function fetchProduct() {
        try {
          const res = await fetch(
            `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
          );
          if (!res.ok) {
            setLoading(false);
            return;
          }
          const data = await res.json();
          if (data?.data) {
            setProduct(data.data);
          } else if (data?.id) {
            setProduct(data);
          }
        } catch (error) {
          console.error("Error fetching product detail:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchProduct();
    }
  }, [session, isSessionPending, id, router]);

  if (isSessionPending || loading) {
    return (
      <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1200px] mx-auto space-y-6 animate-pulse">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-12" />
            <div className="h-4 bg-gray-200 rounded w-4" />
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-4" />
            <div className="h-4 bg-gray-200 rounded w-28" />
          </div>

          {/* Top Banner Skeleton */}
          <div className="bg-[#FAFAFA] border border-gray-200/85 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1 w-full">
              <div className="w-20 h-20 bg-gray-200 rounded-2xl shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-7 bg-gray-200 rounded-lg w-1/2 sm:w-1/3" />
                <div className="h-4 bg-gray-200 rounded-lg w-1/3 sm:w-1/4" />
                <div className="h-4 bg-gray-200 rounded-lg w-2/3 sm:w-1/2" />
              </div>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-2xl p-4 min-w-[160px] h-28 self-stretch md:self-auto flex flex-col justify-center items-center space-y-2">
              <div className="h-3 bg-gray-200 rounded w-16" />
              <div className="h-8 bg-gray-200 rounded w-20" />
              <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
          </div>

          {/* Summary Cards Skeleton */}
          <div className="space-y-3">
            <div className="h-6 bg-gray-200 rounded-lg w-36" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-[#FAFAFA] border border-gray-200/85 rounded-2xl p-5 shadow-sm space-y-2"
                >
                  <div className="h-3 bg-gray-200 rounded w-20" />
                  <div className="h-7 bg-gray-200 rounded-lg w-28" />
                  <div className="h-3 bg-gray-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>

          {/* Table Skeleton */}
          <div className="space-y-3 pt-2">
            <div className="h-6 bg-gray-200 rounded-lg w-48" />
            <div className="bg-[#FAFAFA] border border-gray-200/85 rounded-2xl p-4 shadow-sm space-y-4">
              <div className="grid grid-cols-5 gap-4 border-b border-gray-200 pb-3">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
              </div>
              {[1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="grid grid-cols-5 gap-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-600 text-base font-medium">
          পণ্যটি পাওয়া যায়নি।
        </p>
        <Link
          href="/"
          className="text-sm text-[#008848] font-semibold hover:underline"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    );
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
        {/* Breadcrumb Navigation */}
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

        {/* Top Banner Card */}
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

          {/* Right Price Badge Box */}
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
