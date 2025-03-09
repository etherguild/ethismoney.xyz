"use client";
import Link from "next/link";
import Icon from "@/components/layout/Icon";

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-[48px] mb-[30px] leading-snug">404 Page Not Found</h1>
          <p className="text-center text-lg">The page you requested was not found. We can recommend checking out one of these pages:</p>
          <Link href="/" className="text-blue-500">Home</Link>
        </div>
      </body>
    </html>
  );
}
