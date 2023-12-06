"use client";

import { useEffect, useState } from "react";
import { LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { logOut } from "@/utils/firebase/authService";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

const auth = getAuth();

export default function HeaderAdmin() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  return (
    <div className="flex w-full justify-end items-center h-14 px-4 gap-4 lg:container">
      <ModeToggle />
      <Button variant="outline" size="icon" onClick={() => logOut()}>
        <LogIn />
      </Button>
    </div>
  );
}
