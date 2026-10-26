// "use client";

// export default function CurrentDate() {
//   const currentDateBn = new Date().toLocaleDateString("bn-BD", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   return <span>{currentDateBn}</span>;
// }

"use client";

import { useState, useEffect } from "react";

export default function CurrentDate() {
  const [currentDateBn, setCurrentDateBn] = useState<string>("");

  useEffect(() => {
    const dateStr = new Date().toLocaleDateString("bn-BD", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCurrentDateBn(dateStr);
  }, []);

  // সার্ভার সাইড বা ইনিশিয়াল রেন্ডারে একটি স্ট্যাটিক টেক্সট দেখাবে, যা পরবর্তীতে ক্লায়েন্টে আপডেট হয়ে যাবে
  if (!currentDateBn) {
    return <span>লোড হচ্ছে...</span>;
  }

  return <span>{currentDateBn}</span>;
}
