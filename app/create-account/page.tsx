"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "firebase/auth";
import {
  createAccountWithEmail,
  logWithGoogle,
  onAuthChanged,
} from "@/utils/firebase/authService";

interface CreateAccountProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function CreateAccount({
  className,
  ...props
}: CreateAccountProps) {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    
    const form = event.target as HTMLFormElement;
    const emailInput = form.elements.namedItem("email") as HTMLFormElement;
    const passlInput = form.elements.namedItem("password") as HTMLFormElement;

    createAccountWithEmail(emailInput.value, passlInput.value)
    .then((user) => {
      if (user === undefined) {
        setErrorMessage("Usuário já existe");
      } else {
        setErrorMessage("Usuário já existe");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    })
    .catch((err) => {
      console.error(err)
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

  return (
    <main className="px-4 sm:px-0 lg:container">
      <Card className="max-w-md my-0 mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Crie sua conta</CardTitle>
          <CardDescription>Entre com sua conta Google</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid">
            <Button
              type="submit"
              variant="outline"
              disabled={isLoading}
              onClick={logWithGoogle}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}{" "}
              Gmail
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou continue com email e senha
              </span>
            </div>
          </div>
          <form onSubmit={onSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                disabled={isLoading}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Crie sua conta
            </Button>
            {errorMessage && (
              <p className="text-red-700 mt-2">{errorMessage}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
