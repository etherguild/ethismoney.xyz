import Link from "next/link";

export default function Footer() {
  return (
    <footer id="footer" className="w-full py-[18px] pb-[100px]">
      <div className="flex justify-center items-center gap-x-[15px] text-blue1">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/imprint">Imprint</Link>
      </div>
    </footer>
  );
}
