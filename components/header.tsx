"use client";

import { log } from "console";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { UserPlus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderMobile() {
  const path = usePathname();
  const isCreateAccountPage = path === "/create-account";

  return (
    <div className="flex w-full justify-end items-center h-14 px-4 gap-4 lg:container">
      {isCreateAccountPage ? (
        <Link href="/">
        <Button variant="outline" className="gap-1">
          Login <User />
        </Button>
    </Link>
      ) : (
        <Link href="/create-account">
            <Button variant="outline" className="gap-1">
              Cadastro <UserPlus />
            </Button>
        </Link>
      )}
      <ModeToggle />
    </div>
  );
}
