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
