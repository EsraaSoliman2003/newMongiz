"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Layer_1 } from "@/assets";
import { Eye, EyeOff } from "lucide-react";
import MainButton from "@/components/MainButton/MainButton";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        {/* New Password */}
        <div className="mb-5">
          <label className="block text-sm mb-3 text-white/80">
            {t("NewPasswordLabel")}
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("NewPasswordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full h-11 px-4 rounded-lg
                bg-white/10 border border-white/10
                placeholder:text-white/50 text-white
                outline-none transition-colors duration-300 ease-in-out
                focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className={`absolute ${t("dir") === "rtl" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-white/60 hover:text-white`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-8">
          <label className="block text-sm mb-3 text-white/80">
            {t("ConfirmNewPasswordLabel")}
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t("ConfirmNewPasswordPlaceholder")}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="
                w-full h-11 px-4 rounded-lg
                bg-white/10 border border-white/10
                placeholder:text-white/50 text-white
                outline-none transition-colors duration-300 ease-in-out
                focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30
              "
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className={`absolute ${t("dir") === "rtl" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-white/60 hover:text-white`}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <MainButton text={t("CreateNewPasswordButton")} className="w-full" />
      </div>
    </div>
  );
}
