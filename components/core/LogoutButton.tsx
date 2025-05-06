"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { deleteSession } from "@/lib/session";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await deleteSession();
    router.push("/login");
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  );
}
