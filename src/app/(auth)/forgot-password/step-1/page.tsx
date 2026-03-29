"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Layer_1 } from "@/assets";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Page() {
  const t = useTranslations();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div
        className="
          w-full max-w-md
          bg-white/10 backdrop-blur-xl
          rounded-2xl
          px-8 py-10
          text-white
          shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        "
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <Image src={Layer_1} alt="Logo" width={70} height={70} />
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-center mb-3">
          {t("ResetPasswordTitle")}
        </h1>

        <p className="text-sm text-center text-white/70 mb-8 leading-relaxed">
          {t("ResetPasswordSubtitle")}
        </p>

        {/* Email */}
        <div className="mb-8">
          <label className="block text-sm mb-3 text-white/80">
            {t("EmailLabel")}
          </label>
          <input
            type="email"
            placeholder={t("EmailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full h-11 px-4 rounded-lg
              bg-white/10 border border-white/10
              placeholder:text-white/50 text-white
              outline-none
              focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30
              transition-colors duration-300 ease-in-out
            "
          />
        </div>

        <Link href={"/forgot-password/step-2"} className="px-4 py-2 rounded-md text-sm flex items-center justify-center transition bg-main text-white hover:opacity-90 cursor-pointer">
          {t("ResetPasswordButton")}
        </Link>
      </div>
    </div>
  );
}
