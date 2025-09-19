import { Spinner } from "@heroui/react";

export default function ProfileLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
