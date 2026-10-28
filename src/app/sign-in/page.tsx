"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInPage() {
  const router = useRouter();

  // ১. Form Input States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // UI & Loading States
  const [loading, setLoading] = useState(false);

  // ২. Sign In Submit Handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          setLoading(false);
          toast.success("সফলভাবে সাইন ইন হয়েছে!");
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1500);
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message || "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
        },
      },
    );
  };

  const handleGoogleAuth = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const handleGithubAuth = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Toast Notification Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Main Header Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          সাইন ইন
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* Form Container Card */}
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <form className="space-y-4" onSubmit={handleSignIn}>
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ইমেইল
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008848] text-sm text-gray-900 placeholder:text-gray-400"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#008848] hover:bg-[#00733d] disabled:opacity-50 text-white font-semibold py-3 rounded-xl shadow-md transition-all text-base cursor-pointer"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
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

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleGoogleAuth}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs sm:text-sm font-medium text-gray-700 transition-all shadow-sm cursor-pointer"
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
            onClick={handleGithubAuth}
            type="button"
            className="flex items-center justify-center gap-2 py-2.5 px-3 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs sm:text-sm font-medium text-gray-700 transition-all shadow-sm cursor-pointer"
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

        {/* Sign Up Prompt */}
        <div className="text-center mt-6 text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="text-[#008848] font-semibold hover:underline"
          >
            সাইন আপ করুন
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
