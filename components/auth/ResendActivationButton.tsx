"use client";

import { useEffect, useState } from "react";

const RESEND_SECONDS = 30;

type Props = { onResend: () => Promise<void> };

export function ResendActivationButton({ onResend }: Props) {
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    try {
      setLoading(true);
      setSent(false);
      await onResend();
      setSent(true);
      setCountdown(RESEND_SECONDS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 text-center">
      <p className="text-sm text-muted-foreground">Didn't receive the email?</p>

      {countdown > 0 ? (
        <p className="text-sm text-muted-foreground">
          Resend in{" "}
          <span className="inline-block min-w-[2.5rem] rounded-md border bg-muted/30 px-2 py-0.5 font-mono text-sm font-medium text-foreground tabular-nums">
            {countdown}s
          </span>
        </p>
      ) : sent ? (
        <p className="text-sm font-medium text-green-600">✓ Email sent</p>
      ) : (
        <button
          type="button"
          onClick={handleResend}
          disabled={loading}
          className="text-sm font-medium text-primary underline-offset-4 hover:underline disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? (
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              Sending…
            </span>
          ) : (
            "Resend activation email"
          )}
        </button>
      )}

      <p className="text-xs text-muted-foreground">
        Check your spam or junk folder if you don't see it.
      </p>
    </div>
  );
}