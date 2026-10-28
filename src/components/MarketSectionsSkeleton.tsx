function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-full animate-pulse">
      {/* Top Row Skeleton */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0"></div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-5 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
        </div>
      </div>

      {/* Bottom Row Skeleton */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="space-y-1.5">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-7 w-14 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}

export default function MarketSectionsSkeleton() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-8 space-y-12 bg-white">
      <section>
        <div className="mb-6 space-y-2">
          <div className="h-7 bg-gray-200 rounded-md w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-md w-64 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(3)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-6 space-y-2">
          <div className="h-7 bg-gray-200 rounded-md w-32 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-md w-72 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[...Array(6)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
