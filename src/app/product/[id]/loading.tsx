export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto space-y-6 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="h-4 bg-gray-200 rounded w-12" />
          <div className="h-4 bg-gray-200 rounded w-4" />
          <div className="h-4 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-4" />
          <div className="h-4 bg-gray-200 rounded w-28" />
        </div>

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
