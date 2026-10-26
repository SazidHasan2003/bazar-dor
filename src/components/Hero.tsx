import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  // Navbar-er moto dynamic and latest date in Bangla
  const currentDateBn = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="w-full max-w-[1200px] mx-auto px-4 my-[40px]">
      <div className="bg-[#f9fafb] border border-gray-100 rounded-3xl p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
        {/* Left Content Area */}
        <div className="flex-1 text-center lg:text-left space-y-4">
          {/* Date Badge */}
          <div className="inline-block bg-[#e6f4ea] text-[#008848] px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
            {currentDateBn}
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন, সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Action Button */}
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-block bg-[#008848] hover:bg-[#00733d] text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all text-sm sm:text-base"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="flex-shrink-0 w-full max-w-xs sm:max-w-sm lg:max-w-md flex justify-center">
          <Image
            src="/bazar-hero.png"
            alt="বাজার হিরো ছবি"
            width={400}
            height={350}
            className="object-contain w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
}
