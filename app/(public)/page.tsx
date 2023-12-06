"use client";

import { UserAuthForm } from "@/components/user-auth-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <>
      <main className="px-4 sm:px-0 lg:container">
        <Card className="max-w-md my-0 mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Faça seu login</CardTitle>
            <CardDescription>
              Entre com seu email abaixo para fazer seu login
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <UserAuthForm />
          </CardContent>
        </Card>
      </main>
    </>
  );
}
