export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto space-y-6 animate-pulse">
        {/* Top Header Banner Skeleton */}
        <div className="bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-6 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-2xl shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-6 bg-gray-200 rounded-lg w-1/4" />
            <div className="h-4 bg-gray-200 rounded-lg w-1/3" />
          </div>
        </div>

        {/* Filter/Sort Bar Skeleton */}
        <div className="bg-[#FAFAFA] border border-gray-200/85 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div className="h-4 bg-gray-200 rounded-lg w-32" />
          <div className="h-9 bg-gray-200 rounded-xl w-36" />
        </div>

        {/* Product Cards Grid Skeleton (৬টি কার্ডের লোডিং ইফেক্ট) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between h-40"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                <div className="space-y-2 flex-1 pt-1">
                  <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
                  <div className="h-4 bg-gray-200 rounded-lg w-1/2" />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="space-y-1.5">
                  <div className="h-3 bg-gray-200 rounded w-16" />
                  <div className="h-5 bg-gray-200 rounded w-24" />
                </div>
                <div className="h-7 bg-gray-200 rounded-lg w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
