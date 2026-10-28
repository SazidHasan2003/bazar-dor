// interface ProductCardProps {
//   image: string;

//   nameBn: string;

//   unit: string;

//   today: number;

//   change: {
//     dir: "up" | "down" | "flat";

//     pct: number;
//   };
// }

// export default function ProductCard({
//   image,

//   nameBn,

//   unit,

//   today,

//   change,
// }: ProductCardProps) {
//   // Unit mapping to Bangla

//   const getUnitBn = (u: string) => {
//     switch (u) {
//       case "kg":
//         return "প্রতি কেজি";

//       case "litre":
//         return "প্রতি লিটার";

//       case "dozen":
//         return "প্রতি ডজন";

//       case "piece":
//         return "প্রতি পিস";

//       case "gram":
//         return "প্রতি ১০০ গ্রাম";

//       default:
//         return `প্রতি ${u}`;
//     }
//   };

//   const formatNumber = (num: number) => {
//     return num.toLocaleString("bn-BD");
//   };

//   const isUp = change.dir === "up";

//   const isDown = change.dir === "down";

//   return (
//     <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
//       {/* Top Row: Icon, Name & Unit */}

//       <div className="flex items-start gap-3">
//         <span className="text-2xl sm:text-3xl shrink-0 p-2 bg-gray-50 rounded-xl">
//           {image}
//         </span>

//         <div className="min-w-0 flex-1">
//           <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate leading-snug">
//             {nameBn}
//           </h3>

//           <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
//             {getUnitBn(unit)}
//           </p>
//         </div>
//       </div>

//       {/* Bottom Row: Price & Change Percentage Badge */}

//       <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
//         <div>
//           <span className="text-xs text-gray-400 block font-medium">
//             আজকের দাম
//           </span>

//           <span className="text-lg sm:text-xl font-extrabold text-gray-900">
//             {formatNumber(today)} টাকা
//           </span>
//         </div>

//         {/* Change Badge */}

//         <div
//           className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs sm:text-sm font-bold ${
//             isUp
//               ? "text-red-600 bg-red-50"
//               : isDown
//                 ? "text-[#008848] bg-green-50"
//                 : "text-gray-600 bg-gray-100"
//           }`}
//         >
//           <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>

//           <span>{Math.abs(change.pct)}%</span>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";

interface ProductCardProps {
  id: number; // ১. id প্রপস যুক্ত করা হলো
  image: string;
  nameBn: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default function ProductCard({
  id, // ২. id রিসিভ করা হলো
  image,
  nameBn,
  unit,
  today,
  change,
}: ProductCardProps) {
  const getUnitBn = (u: string) => {
    switch (u) {
      case "kg":
        return "প্রতি কেজি";
      case "litre":
        return "প্রতি লিটার";
      case "dozen":
        return "প্রতি ডজন";
      case "piece":
        return "প্রতি পিস";
      case "gram":
        return "প্রতি ১০০ গ্রাম";
      default:
        return `প্রতি ${u}`;
    }
  };

  const formatNumber = (num: number) => num.toLocaleString("bn-BD");

  const isUp = change.dir === "up";
  const isDown = change.dir === "down";

  return (
    <Link href={`/product/${id}`} className="block group">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
        {/* Top Row: Icon, Name & Unit */}
        <div className="flex items-start gap-3">
          <span className="text-2xl sm:text-3xl shrink-0 p-2 bg-gray-50 rounded-xl">
            {image}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate leading-snug group-hover:text-[#008848] transition-colors">
              {nameBn}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              {getUnitBn(unit)}
            </p>
          </div>
        </div>

        {/* Bottom Row: Price & Change Percentage Badge */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">
              আজকের দাম
            </span>
            <span className="text-lg sm:text-xl font-extrabold text-gray-900">
              {formatNumber(today)} টাকা
            </span>
          </div>

          {/* Change Badge */}
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs sm:text-sm font-bold ${
              isUp
                ? "text-red-600 bg-red-50"
                : isDown
                  ? "text-[#008848] bg-green-50"
                  : "text-gray-600 bg-gray-100"
            }`}
          >
            <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
            <span>{Math.abs(change.pct)}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
