"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, ToLeft, ToRight, bottomArrow } from "@/assets";
import MainButton from "@/components/MainButton/MainButton";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/rtk/hooks";
import { categoriesMenu, fetchMenu } from "@/rtk/slices/categoriesMenu/categoriesMenuSlice";
import Link from "next/link";
import NoData from "@/components/noData/NoData";

export default function CategoriesDrawer() {
    const [open, setOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<categoriesMenu | null>(null);
    const t = useTranslations();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMenu())
    }, [dispatch])

    const { data, loading } = useAppSelector((s) => s.categoriesMenu)


    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => {
                setOpen(false);
                setActiveCategory(null);
            }}
        >
            {/* trigger */}
            <div className="flex items-center gap-2 cursor-pointer select-none py-3 px-4 rounded-lg active:bg-gray-100 transition-all duration-200 group">
                {/* Menu icon */}
                <div className="w-5 h-5 relative">
                    <Image
                        src={Menu}
                        alt="menu"
                        fill
                        className="object-contain transition-transform duration-200 group-hover:scale-110"
                    />
                </div>
                <span className="group-hover:text-orange-500 transition-colors duration-200">
                    {t("Categories")}
                </span>
                {/* Arrow icon */}
                <div className={`w-2.5 h-2.5 relative transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                    <Image
                        src={bottomArrow}
                        alt="arrow"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* menu */}
            {open && (
                <div
                    className={`absolute top-full ${t("dir") === "rtl" ? "right-0" : "left-0"} rounded-lg z-50 flex container h-125`}
                >
                    {/* المرحلة الأولى */}
                    <div className="w-60 lg:w-72 bg-white shadow-2xl rounded-r-lg border border-gray-100 h-full">
                        <div className="p-1">
                            <ul className="space-y-1">
                                {data.slice(0, 10).map((cat) => {
                                    const isActive = activeCategory?.id === cat.id;

                                    return (
                                        <li
                                            key={cat.id}
                                            onMouseEnter={() => setActiveCategory(cat)}
                                            className={`px-4 py-2.5 cursor-pointer flex justify-between items-center rounded-lg transition-all duration-200 
                                                    ${isActive
                                                    ? `bg-linear-to-l from-orange-50 to-orange-100 text-orange-600 ${t("dir") === "rtl" ? "border-r-4" : "border-l-4"} border-orange-500`
                                                    : "hover:bg-gray-50 text-gray-700"
                                                }`}
                                        >
                                            <span className="font-medium">{cat.name}</span>

                                            <div
                                                className={`w-2 h-2 relative transition-transform duration-200 ${isActive ? "scale-125" : ""
                                                    }`}
                                            >
                                                <Image
                                                    src={t("dir") === "rtl" ? ToLeft : ToRight}
                                                    alt="arrow"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                            <MainButton
                                text={t("AllCategories")}
                                className="m-4 w-[calc(100%-2rem)]"
                                href="/products"
                            />
                        </div>
                    </div>

                    {/* المرحلة الثانية */}
                    {activeCategory && (
                        <div className="bg-white shadow-2xl p-8 rounded-l-lg border border-gray-100 h-full min-w-[320px] max-w-[500px] inline-block">
                            <div className="h-full">
                                <div className="h-full flex flex-col flex-wrap content-start gap-y-3 gap-x-8">
                                    {activeCategory.subCategories.length > 0 ? activeCategory.subCategories.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/products?category=${item.categoryId}&subCategory=${item.id}`}
                                            className="cursor-pointer group inline-block"
                                        >
                                            <span className="text-gray-600 group-hover:text-orange-500 transition-all duration-200 block py-2 px-4 rounded-lg group-hover:bg-orange-50">
                                                {item.name}
                                            </span>
                                        </Link>
                                    ))
                                        : <div className="w-full">
                                            <NoData />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}