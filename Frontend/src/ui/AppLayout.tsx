import type { ReactNode } from "react";
import Header from "./Header";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="grid h-[90vh] w-full grid-cols-1 overflow-hidden bg-amber-50 md:grid-cols-2">
        {children}
      </div>
    </>
  );
}
