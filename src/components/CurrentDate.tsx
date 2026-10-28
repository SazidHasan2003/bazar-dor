// "use client";

// import { useState, useEffect } from "react";

// export default function CurrentDate() {
//   const [currentDateBn, setCurrentDateBn] = useState<string>("");

//   useEffect(() => {
//     const dateStr = new Date().toLocaleDateString("bn-BD", {
//       weekday: "long",
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//     setCurrentDateBn(dateStr);
//   }, []);

//   if (!currentDateBn) {
//     return <span>লোড হচ্ছে...</span>;
//   }

//   return <span>{currentDateBn}</span>;
// }
import { connection } from "next/server";

export default async function CurrentDate() {
  await connection();

  const dateStr = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return <span>{dateStr}</span>;
}
