"use client";
import Image from "next/image";
import MainButton from "@/components/MainButton/MainButton";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useAppSelector } from "@/rtk/hooks";
import { useState } from "react";
import SafeImage from "@/components/safeImage/SafeImage";

export default function LeftSection() {
    const t = useTranslations();
    const { data } = useAppSelector((s) => s.banner);

    const index = 7;

    return (
        <div className="hidden lg:block lg:col-span-2 cursor-pointer">
            <Link
                href={data[0]?.links?.[index] || "/"}
                className="relative bg-[#EAF4F3] rounded-lg p-4 h-full flex flex-col items-center justify-between group overflow-hidden"
            >
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                <div className="relative z-20 h-full flex flex-col items-center justify-between">
                    <div className="text-center">

                        {
                            data[0]?.titles?.[index] && (
                                <>
                                    <p className="text-sm text-gray-500">منتج</p>
                                    <h3 className="max-w-[120px] font-semibold">
                                        {data[0]?.titles?.[index]}
                                    </h3>
                                </>
                            )
                        }
                    </div>

                    <SafeImage
                        src={data[0]?.images?.[index]}
                        alt={data[0]?.titles?.[index] || `banner-${index}`}
                        width={240}
                        height={360}
                        className="object-contain"
                    />

                    <MainButton text={t("ShopNow")} />
                </div>
            </Link>
        </div>
    );
}
