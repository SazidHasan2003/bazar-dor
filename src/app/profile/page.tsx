// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Image from "next/image";
// import Link from "next/link";

// export default function ProfilePage() {
//   const router = useRouter();
//   const { data: session, isPending, refetch } = authClient.useSession();

//   const [name, setName] = useState(session?.user?.name ?? "");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!isPending && !session) {
//       router.push("/sign-in");
//     }
//   }, [session, isPending, router]);

//   if (isPending) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         অপেক্ষা করুন...
//       </div>
//     );
//   }

//   if (!session) {
//     return null;
//   }

//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     await authClient.updateUser(
//       {
//         name: name,
//       },
//       {
//         onSuccess: () => {
//           setLoading(false);
//           toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
//           refetch();
//         },
//         onError: (ctx) => {
//           setLoading(false);
//           toast.error(ctx.error.message || "আপডেট করতে সমস্যা হয়েছে");
//         },
//       },
//     );
//   };

//   const handleSignOut = async () => {
//     await authClient.signOut({
//       fetchOptions: {
//         onSuccess: () => {
//           router.push("/");
//           router.refresh();
//         },
//       },
//     });
//   };

//   return (
//     <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className="max-w-2xl mx-auto space-y-6">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
//             আমার প্রোফাইল
//           </h1>
//           <p className="text-sm text-gray-500 mt-1">
//             আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
//           </p>
//         </div>

//         {/* Top User Info Card */}
//         <div className="bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="w-14 h-14 rounded-full bg-[#008848] text-white flex items-center justify-center font-bold text-xl overflow-hidden shrink-0 shadow-sm">
//               {session.user.image ? (
//                 <Image
//                   src={session.user.image}
//                   alt="Profile"
//                   width={56}
//                   height={56}
//                   className="object-cover w-full h-full"
//                 />
//               ) : (
//                 session.user.name?.charAt(0).toUpperCase()
//               )}
//             </div>
//             <div>
//               <h2 className="font-bold text-gray-900 text-base sm:text-lg">
//                 {session.user.name}
//               </h2>
//               <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[220px] sm:max-w-xs">
//                 {session.user.email}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={handleSignOut}
//             className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl transition-all text-xs sm:text-sm font-medium cursor-pointer w-full sm:w-auto justify-center"
//           >
//             <span>←</span>
//             <span>সাইন আউট</span>
//           </button>
//         </div>

//         {/* Bottom Info / Update Form Card */}
//         <div className="bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
//           <h3 className="font-bold text-gray-900 text-base sm:text-lg border-b border-gray-200/60 pb-3">
//             তথ্য
//           </h3>

//           <form onSubmit={handleUpdateProfile} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                 নাম
//               </label>
//               <input
//                 type="text"
//                 defaultValue={session.user.name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008848] text-sm text-gray-900 shadow-sm"
//                 required
//               />
//             </div>

//             <div className="pt-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 bg-[#008848] hover:bg-[#00733d] disabled:opacity-50 text-white font-semibold rounded-xl shadow-md transition-all text-base cursor-pointer"
//               >
//                 {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
//               </button>
//             </div>
//           </form>
//         </div>

//         <div className="pt-2">
//           <Link
//             href="/"
//             className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
//           >
//             ← হোম পেজে ফিরে যান
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();

  const [name, setName] = useState(session?.user?.name ?? "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        অপেক্ষা করুন...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await authClient.updateUser(
      {
        name: name,
      },
      {
        onSuccess: () => {
          setLoading(false);
          toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
          refetch();
        },
        onError: (ctx) => {
          setLoading(false);
          toast.error(ctx.error.message || "আপডেট করতে সমস্যা হয়েছে");
        },
      },
    );
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("আপনি সফলভাবে লগআউট করেছেন!");

          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 1000);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "লগআউট করতে সমস্যা হয়েছে");
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Top User Info Card */}
        <div className="bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#008848] text-white flex items-center justify-center font-bold text-xl overflow-hidden shrink-0 shadow-sm">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              ) : (
                session.user.name?.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-base sm:text-lg">
                {session.user.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate max-w-[220px] sm:max-w-xs">
                {session.user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl transition-all text-xs sm:text-sm font-medium cursor-pointer w-full sm:w-auto justify-center"
          >
            <span>←</span>
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* Bottom Info / Update Form Card */}
        <div className="bg-[#FAFAFA] border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg border-b border-gray-200/60 pb-3">
            তথ্য
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                নাম
              </label>
              <input
                type="text"
                defaultValue={session.user.name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#008848] text-sm text-gray-900 shadow-sm"
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#008848] hover:bg-[#00733d] disabled:opacity-50 text-white font-semibold rounded-xl shadow-md transition-all text-base cursor-pointer"
              >
                {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
              </button>
            </div>
          </form>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
}
