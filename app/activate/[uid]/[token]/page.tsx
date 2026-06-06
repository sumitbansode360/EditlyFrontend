"use client";

import { useEffect } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import axios from "axios";

import {
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { Card } from "@/components/ui/card";

export default function ActivatePage() {
  const params = useParams();

  const router = useRouter();

  const uid =
    params.uid as string;

  const token =
    params.token as string;

  useEffect(() => {
    const activateAccount =
      async () => {
        try {
          await axios.get(
            `http://127.0.0.1:8000/api/auth/activate/${uid}/${token}`
          );

          setTimeout(() => {
            router.push("/");
          }, 2500);
        } catch (error) {
          console.error(error);
        }
      };

    activateAccount();
  }, [uid, token, router]);

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md p-8">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="mb-5 h-16 w-16 text-green-500" />

          <h1 className="text-3xl font-bold">
            Activating Account
          </h1>

          <p className="mt-3 text-muted-foreground">
            Please wait while we
            verify your account.
          </p>

          <Loader2 className="mt-6 h-6 w-6 animate-spin" />
        </div>
      </Card>
    </main>
  );
}