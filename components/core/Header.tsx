import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Button } from "../ui/button";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { LogoutButton } from "./LogoutButton";
import { Roles } from "@/lib/configs";

export async function Header() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 z-50 bg-white">
      <Link className="flex items-center justify-center" href="/">
        <HomeIcon className="h-6 w-6" />

        <span className="ml-2 font-bold">Memories</span>
      </Link>
      <nav className="ml-auto hidden md:flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/properties"
        >
          Search Properties
        </Link>

        {session?.userId ? (
          <>
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href={session?.role === Roles.customer ? "/p" : "/d"}
            >
              Dashboard
            </Link>

            <LogoutButton />
          </>
        ) : (
          <>
            <Link
              className="text-sm font-medium text-primary hover:underline underline-offset-4"
              href="/login"
            >
              Login
            </Link>
            <Link href="/register">
              <Button size="sm">Register</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
