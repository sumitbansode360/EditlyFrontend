"use client";

import Link from "next/link";
import { FileText, Globe, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden border-r bg-muted/20 lg:flex">
          {/* Main gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />

          {/* Large blurred glow */}
          <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-primary/5 blur-3xl" />

          <div className="absolute bottom-[-150px] right-[-100px] h-[300px] w-[300px] rounded-full bg-primary/5 blur-3xl" />

          {/* Decorative circles */}
          <div className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/40" />

          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/30" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
          linear-gradient(to right, currentColor 1px, transparent 1px),
          linear-gradient(to bottom, currentColor 1px, transparent 1px)
        `,
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full w-full flex-col justify-between p-14">
            {/* Top Content */}
            <div className="max-w-lg">
              {/* Logo */}
              <div className="mb-14 flex h-16 w-16 items-center justify-center rounded-3xl border bg-background/80 shadow-sm backdrop-blur">
                <FileText className="h-8 w-8" />
              </div>

              {/* Heading */}
              <div className="space-y-2">
                <h1 className="text-6xl font-bold leading-[1] tracking-tight text-foreground">
                  Create.
                </h1>

                <h1 className="text-6xl font-bold leading-[1] tracking-tight text-foreground">
                  Edit.
                </h1>

                <h1 className="text-6xl font-bold leading-[1] tracking-tight text-foreground">
                  Collaborate.
                </h1>
              </div>

              {/* Divider */}
              <div className="mt-10 h-px w-20 bg-border" />

              {/* Description */}
              <p className="mt-8 max-w-md text-base leading-8 text-muted-foreground">
                A realtime collaborative document editor built for teams to
                write, organize and manage documents together with speed and
                simplicity.
              </p>

              {/* Feature pills */}
              <div className="mt-10 flex flex-wrap gap-3">
                <div className="rounded-full border bg-background/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
                  Realtime Sync
                </div>

                <div className="rounded-full border bg-background/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
                  Team Collaboration
                </div>

                <div className="rounded-full border bg-background/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
                  Secure Storage
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="relative pt-10">
              {/* Horizontal line */}
              <div className="absolute left-0 top-1/2 h-px w-full bg-border/60" />

              {/* Bottom label */}
              <div className="relative inline-flex items-center gap-3 bg-muted/20 pr-6 text-xs font-semibold tracking-[0.3em] text-muted-foreground uppercase backdrop-blur">
                <div className="h-2 w-2 rounded-full bg-primary/60" />
                Collaborative Document Platform
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Form */}
            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border bg-muted">
                <FileText className="h-6 w-6" />
              </div>

              <h2 className="text-4xl font-bold tracking-tight">
                Welcome back
              </h2>

              <p className="mt-3 text-muted-foreground">
                Sign in to continue your journey
              </p>

              <form className="mt-10 space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold tracking-[0.2em] uppercase">
                    Email Address
                  </Label>

                  <Input
                    type="email"
                    placeholder="name@company.com"
                    className="h-12 rounded-xl"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold tracking-[0.2em] uppercase">
                    Password
                  </Label>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-12 rounded-xl pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl text-sm font-semibold tracking-wide"
                >
                  → SIGN IN TO YOUR ACCOUNT
                </Button>

                {/* Footer */}
                <div className="pt-2 text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-foreground transition-opacity hover:opacity-70"
                  >
                    Create account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
