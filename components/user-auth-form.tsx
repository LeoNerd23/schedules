"use client";

import React from "react";
import { FormEvent, useEffect, useState } from "react";
import { login, onAuthChanged } from "@/utils/firebase/authService";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    const form = event.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLFormElement;
    const passlInput = form.elements.namedItem("pass") as HTMLFormElement;

    login(emailInput.value, passlInput.value)
      .then((user) => {
        console.log(user);
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          setErrorMessage("Email não cadastrado.");
        } else {
          setErrorMessage("Email ou senha incorreto");
          setTimeout(() => {
            setErrorMessage(null);
          }, 3000);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    function unsubscribe() {
      return onAuthChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(user);
        }
      });
    }
    return unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/teste");
    }
  }, [user, router]);

  console.log("user", user);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="sr-only" htmlFor="password">
              Senha
            </Label>
            <Input
              id="pass"
              placeholder="******"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
          {errorMessage && <p className="text-red-700 mt-2">{errorMessage}</p>}
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou entre com
          </span>
        </div>
      </div>
      <Button type="submit" variant="outline" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Gmail
      </Button>
    </div>
  );
}
