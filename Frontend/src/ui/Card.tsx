import type { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-[200px] w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl shadow-xl">
      <img
        src="/card-bg.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="z-[1000] flex w-full flex-col items-center justify-center px-14">
        {children}
      </div>
    </div>
  );
}
