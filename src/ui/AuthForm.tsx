import type { ReactNode } from "react";

export function AuthForm({
  onSubmit,
  children,
}: {
  onSubmit: (e: React.FormEvent) => void;
  children: ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {children}
    </form>
  );
}
