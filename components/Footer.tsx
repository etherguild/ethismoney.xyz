import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-[18px] pb-[100px]">
      <div className="flex justify-between items-center gap-x-[15px]">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/imprint">Imprint</Link>
      </div>
    </footer>
  );
}
