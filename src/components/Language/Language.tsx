"use client";

import { setCookie } from "cookies-next";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  locale: string;
}

const LanguageDropdown = ({ locale }: Props) => {
  const router = useRouter();

  const languages = [
    { code: "en", label: "US" },
    { code: "ar", label: "AR" },
    { code: "zh", label: "CN" },
  ];

  const changeLanguage = (code: string) => {
    setCookie("NEXT_LOCALE", code, { path: "/" });
    window.location.reload();
  };

  return (
    <div className="relative inline-block group">
      {/* Button showing current language */}
      <button className="flex items-center gap-2 px-3 py-1 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all duration-200 cursor-pointer text-sm font-medium">
        <span>{languages.find(l => l.code === locale)?.label || "Lang"}</span>
        <Globe size={16} />
      </button>

      {/* Dropdown menu */}
      <div className="absolute right-0 top-full mt-2 w-28 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="flex flex-col text-sm text-gray-700">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="px-4 py-2 hover:bg-gray-100"
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageDropdown;