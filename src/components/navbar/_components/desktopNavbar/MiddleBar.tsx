"use client";

import MainButton from "@/components/MainButton/MainButton";
import { cart, favorite, logo, bottomArrow } from "@/assets";
import Image from "next/image";
import { useRef, useState } from "react";
import CategoriesMenu from "./CategoriesMenu";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Language from "@/components/Language/Language";
import { useAuth } from "@/context/AuthContext";
import { Search, Mic } from "lucide-react"; // Add this import at the top
import { useCart } from "@/hooks/useCart";
import SearchSection from "./SearchSection";
import Currency from "./Currency";


const MiddleBar = ({ locale }: { locale: string }) => {
  const { token } = useAuth();
  const { items } = useCart();

  return (
    <div className="flex items-center justify-between py-4 px-4 md:px-0 gap-6 bg-dark">
      {/* Logo */}
      <Link href={"/"} className="flex items-center gap-2  h-12">
        <Image
          src={logo}
          alt="logo"
          className="object-contain"
          loading="lazy"
        />
      </Link>

      {/* Search */}
      <SearchSection />

      {/* Left Icons */}
      <div className="flex items-center gap-3 text-white">
        <Currency />
        <Language locale={locale} />

        {/* Cart */}
        <Link href={"/cart"}
          className="relative w-5 h-5 cursor-pointer hover:opacity-80 transition"
        >
          <Image
            src={cart}
            alt="cart"
            width={20}
            height={20}
            className="object-contain"
          />

          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-main text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {items.length}
            </span>
          )}

        </Link>

        {/* Favorite */}
        <Link href={token ? "/favourite" : "/login"}
          className="relative w-5 h-5 cursor-pointer hover:opacity-80 transition">
          <Image
            src={favorite}
            alt="wishlist"
            width={20}
            height={20}
            className="object-contain"
          />
        </Link>
      </div>
    </div>
  );
};

export default MiddleBar;
