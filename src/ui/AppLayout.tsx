import type { ReactNode } from "react";

export function AuthLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto mt-10 w-80 rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-center text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}
