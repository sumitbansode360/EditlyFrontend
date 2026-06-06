"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  email: string;
  onResend: () => Promise<void>;
};

const RESEND_SECONDS = 30;

export function ResendActivationButton({
  email,
  onResend,
}: Props) {
  const [countdown, setCountdown] =
    useState(RESEND_SECONDS);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    try {
      setLoading(true);

      await onResend();

      setCountdown(RESEND_SECONDS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled={
          countdown > 0 || loading
        }
        onClick={handleResend}
      >
        {loading
          ? "Sending..."
          : countdown > 0
          ? `Resend email in ${countdown}s`
          : "Resend activation email"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Sent to {email}
      </p>
    </div>
  );
}