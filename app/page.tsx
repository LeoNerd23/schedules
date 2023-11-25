"use client";

import { UserAuthForm } from "@/components/user-auth-form";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function LoginPage() {

  return (
    <>
      <main className="h-full">
        <div className="flex w-full container pt-8 justify-end">
          <ModeToggle />
        </div>
        <div className="h-full container relative flex-col items-center justify-center flex lg:max-w-none lg:px-0">
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Faça seu login
                </h1>
                <p className="text-sm text-muted-foreground">
                  Entre com seu email abaixo para fazer seu login
                </p>
              </div>
              <UserAuthForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
