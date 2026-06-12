"use client";

import Navbar from "@/components/Navbar";
import { DocumentList } from "@/components/documents/Home/DocumentList";
import { documents } from "@/data/documents";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();
  const { logout } = useUser();
  const { isAuthenticated } = useUser();
  const login = () => {
    router.push("/login");
  };
  
  const { user } = useUser();
  const userDetails = {
    name: user?.first_name + " " + user?.last_name,
    isAuthenticated: isAuthenticated
  }

  return (
    <>
      <Navbar onLogout={logout} onLogin={login} user={userDetails}/>
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Page Header */}
        <section className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back, {user?.first_name}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Access your recent documents, continue editing, and collaborate with
            your team in real time.
          </p>
        </section>

        {/* Documents */}
        <DocumentList documents={documents} />
      </div>
    </>
  );
}

export default Home;
