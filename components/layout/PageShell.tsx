import { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0 py-10 lg:py-16">
      {children}
    </div>
  );
}

