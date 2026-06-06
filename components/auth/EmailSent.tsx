"use client";

import { MailCheck } from "lucide-react";

import { Card } from "@/components/ui/card";

import { ResendActivationButton } from "./ResendActivationButton";

type Props = {
  email: string;
};

export function EmailSent({
  email,
}: Props) {
  const resendEmail =
    async () => {
      /*
       axios.post(
          "/api/auth/resend-activation",
          { email }
       );
      */

      console.log(
        "resend activation email"
      );
    };

  return (
    <Card className="w-full max-w-md p-8">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border bg-muted">
          <MailCheck className="h-8 w-8" />
        </div>

        <h1 className="text-3xl font-bold">
          Check your email
        </h1>

        <p className="mt-3 text-muted-foreground">
          Your account was created
          successfully.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          We've sent an activation
          link to:
        </p>

        <p className="mt-1 font-medium">
          {email}
        </p>

        <div className="mt-8 w-full">
          <ResendActivationButton
            email={email}
            onResend={resendEmail}
          />
        </div>
      </div>
    </Card>
  );
}