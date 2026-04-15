"use client";

import { useAppDispatch, useAppSelector } from "@/rtk/hooks";
import { setTrue } from "@/rtk/slices/openMenu";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SidebarToggle() {
  const dispatch = useAppDispatch();
  const { logo, loading } = useAppSelector((s) => s.logo)

  return (
    <div
      className="
        lg:hidden fixed top-0
        flex items-center justify-between
        w-full px-4 py-3
        bg-white/80 backdrop-blur
        border-b border-gray-100
        z-50 bg-dark
      "
    >
      {/* Title */}
      <Link href={"/"}>
        {loading ? (
          <div className="w-40 h-10 bg-gray-200 animate-pulse rounded"></div>
        ) : (
          <div className="relative w-20 h-8">
            <Image
              src={logo?.logoDarkMode || "/default-logo.png"}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
        )}
      </Link>

      {/* Button */}
      <button
        onClick={() => dispatch(setTrue())}
        className="p-0 rounded-lg hover:bg-white/10 transition cursor-pointer"
      >
        <Menu size={22} className="text-white" />
      </button>
    </div>
  );
}
