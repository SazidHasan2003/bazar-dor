"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function NavAuthMenu() {
  const { data: session, isPending } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  if (isPending) {
    return <div className="text-sm text-gray-400">অপেক্ষা করুন...</div>;
  }

  if (session) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 focus:outline-none cursor-pointer py-1.5 px-3 rounded-xl hover:bg-gray-50 transition-all"
        >
          {/* User Avatar Initial */}
          <div className="w-9 h-9 rounded-full bg-[#008848] text-white flex items-center justify-center font-bold text-sm">
            {session.user.name?.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-gray-800 text-sm hidden sm:inline">
            {session.user.name}
          </span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
        </button>

        {/* Dropdown Pop-up Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 z-50">
            {/* User Info Header */}
            <div className="px-4 pb-3 border-b border-gray-100">
              <p className="font-bold text-gray-900 text-sm">
                {session.user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session.user.email}
              </p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>আমার প্রোফাইল</span>
              </Link>
            </div>

            {/* Sign Out Button */}
            <div className="pt-2 border-t border-gray-100 px-2">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium cursor-pointer"
              >
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>সাইন আউট</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Link href="/sign-in">
        <button
          type="button"
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium text-gray-800 hover:text-gray-900 transition-colors cursor-pointer"
        >
          সাইন ইন
        </button>
      </Link>

      <Link href="/sign-up">
        <button
          type="button"
          className="px-4 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base font-semibold text-white bg-[#008848] hover:bg-[#00733d] rounded-xl shadow-sm transition-all cursor-pointer"
        >
          সাইন আপ
        </button>
      </Link>
    </div>
  );
}
