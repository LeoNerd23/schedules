"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { logOut } from "@/utils/firebase/authService";
import { useRouter } from "next/navigation";

const auth = getAuth();

export default function CardWithForm() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        router.push("/");
      }
    });
    console.log(user);

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <main>
      <div>
          <p>Olá, <strong>{user?.email}</strong> você está logado</p>
          <Button onClick={() => logOut()}>Sair</Button>
      </div>
    </main>
  );
}
