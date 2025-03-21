import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 z-50 bg-white">
      <Link className="flex items-center justify-center" href="/">
        <HomeIcon className="h-6 w-6" />

        <span className="ml-2 font-bold">Memories</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/properties?status=available&type=buy"
        >
          Buy
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/properties?status=available&type=rent"
        >
          Rent
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/sell"
        >
          Sell
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/d"
        >
          Dashboard
        </Link>
        <Link
          className="text-sm font-medium text-primary hover:underline underline-offset-4"
          href="/login"
        >
          Login
        </Link>
        <Link href="/register">
          <Button size="sm">Register</Button>
        </Link>
      </nav>
    </header>
  );
}
