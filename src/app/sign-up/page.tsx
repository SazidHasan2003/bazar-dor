"use client";

import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Main Header Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Form Container Card */}
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              নাম
            </label>
            <input
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008848] text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008848] text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008848] text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              type="password"
              placeholder="আবার লিখুন"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008848] text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#008848] hover:bg-[#00733d] text-white font-semibold py-3 rounded-xl shadow-md transition-all text-base"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-400 font-medium">
              অথবা
            </span>
          </div>
        </div>

        {/* Social Login Buttons with Google.png & github.png */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs sm:text-sm font-medium text-gray-700 transition-all shadow-sm"
          >
            <Image
              src="/Google.png"
              alt="Google logo"
              width={18}
              height={18}
              className="object-contain"
            />
            <span>Google দিয়ে</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs sm:text-sm font-medium text-gray-700 transition-all shadow-sm"
          >
            <Image
              src="/github.png"
              alt="GitHub logo"
              width={18}
              height={18}
              className="object-contain"
            />
            <span>GitHub দিয়ে</span>
          </button>
        </div>

        {/* Sign In Prompt */}
        <div className="text-center mt-6 text-sm text-gray-600">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="text-[#008848] font-semibold hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </div>
      </div>

      {/* Back to Home Footer Link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
