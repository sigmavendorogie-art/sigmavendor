import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <div className="text-center py-24">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-lg text-slate-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </PageShell>
  );
}

