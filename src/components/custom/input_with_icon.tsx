import type {LucideIcon} from "lucide-react";
import type {ChangeEvent, ReactNode} from "react";

interface InputWithIconProps {
  Icon: LucideIcon;
  label: ReactNode;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export default function InputWithIcon({Icon, label, type = "text", placeholder, value, onChange}: InputWithIconProps) {
  return (
    <div className={`space-y-1`}>
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"/>
        <input
          className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-10 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:border-purple-500 transition-colors shadow-sm"
          type={type} placeholder={placeholder} value={value} onChange={onChange}
        />
      </div>
    </div>
  );
}