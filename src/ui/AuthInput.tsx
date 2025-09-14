import { Input } from "@heroui/react";

export function AuthInput({
  type = "text",
  value,
  placeholder,
  onChange,
}: {
  type?: string;
  value: string|undefined;
  placeholder: string;
  onChange: (val: string) => void;
}) {
  return (
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      variant="bordered"
      className="w-full"
    />
  );
}
