import type { ReactNode } from "react";

export function AuthForm({
  onSubmit,
  children,
}: {
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="relative flex h-screen flex-col items-center gap-3 bg-white px-5 shadow-xl sm:w-full"
    >
      {children}
    </form>
  );
}
