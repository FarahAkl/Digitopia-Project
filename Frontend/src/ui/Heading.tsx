import type { ReactNode } from "react";

export default function Heading({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 text-center">
      <h1 className="mb-7 text-3xl font-bold text-green-900">{children}</h1>
      <div className="mx-auto mt-1 h-0.5 w-20 rounded-full bg-green-900"></div>
    </div>
  );
}
