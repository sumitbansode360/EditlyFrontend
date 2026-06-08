"use client";

import AuthHeroSection from "@/components/auth/AuthHeroSection";
import { EmailSent } from "@/components/auth/EmailSent";
import { SignupForm } from "@/components/auth/SignupForm";
import { PendingUser, SignupStep } from "@/types/auth";
import { useState } from "react";

export default function SignupPage() {
  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null);
  const [currentStep, setCurrentStep] = useState<SignupStep>("signup");

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden border-r bg-muted/20 lg:flex">
          <AuthHeroSection />
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center px-6 py-10">
          {currentStep === "signup" && (
            <SignupForm
              mode="signup"
              setPendingUser={setPendingUser}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === "edit" && (
            <SignupForm
              mode="edit"
              pendingUser={pendingUser}
              setPendingUser={setPendingUser}
              setCurrentStep={setCurrentStep}
            />
          )}

          {currentStep === "verify" && pendingUser && (
            <EmailSent
              pendingUser={pendingUser}
              onBack={() => setCurrentStep("edit")}
            />
          )}
        </section>
      </div>
    </main>
  );
}
