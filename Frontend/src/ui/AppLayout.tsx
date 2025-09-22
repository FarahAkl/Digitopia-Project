import type { ReactNode } from "react";
import Header from "./Header";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="mx-auto mt-10 w-80 rounded-xl bg-white p-6 shadow">
        {children}
      </div>
    </>
  );
}
