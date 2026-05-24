import AuthHeroSection from "@/components/auth/AuthHeroSection";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden border-r bg-muted/20 lg:flex">
          <AuthHeroSection />
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center px-6 py-10">
          <SignupForm />
        </section>
      </div>
    </main>
  );
}
