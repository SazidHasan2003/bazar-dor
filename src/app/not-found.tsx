import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-white">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Top Icon or Graphic */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-3xl bg-[#008848]/10 flex items-center justify-center text-[#008848] shadow-sm mb-2">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Error Code & Title */}
        <div className="space-y-2">
          <span className="text-sm font-bold text-[#008848] tracking-wider uppercase bg-[#008848]/10 px-3 py-1 rounded-full mb-2">
            ৪০০ | পাতা পাওয়া যায়নি
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-4">
            উপরে বা নিচে কোথাও নেই!
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-sm mx-auto">
            আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা লিংকটি ভুল ছিল।
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#008848] hover:bg-[#00733d] text-white font-semibold rounded-xl shadow-md transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>←</span>
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
