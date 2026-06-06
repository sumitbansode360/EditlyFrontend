"use client";

import AuthHeroSection from "@/components/auth/AuthHeroSection";
import { EmailSent } from "@/components/auth/EmailSent";
import { SignupForm } from "@/components/auth/SignupForm";
import { useState } from "react";

export default function SignupPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden border-r bg-muted/20 lg:flex">
          <AuthHeroSection />
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center px-6 py-10">
          {emailSent ? (
            <EmailSent
              email={registeredEmail}
              onBack={() => setEmailSent(false)}
            />
          ) : (
            <SignupForm
              setEmailSent={setEmailSent}
              setRegisteredEmail={setRegisteredEmail}
            />
          )}
        </section>
      </div>
    </main>
  );
}
