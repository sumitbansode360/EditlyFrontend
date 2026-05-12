import Navbar from "@/components/Navbar";
import { DocumentList } from "@/components/documents/Home/DocumentList";
import { documents } from "@/data/documents";

function Home() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Page Header */}
        <section className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back, Sumit
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
