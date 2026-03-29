"use client";

import SafeImage from "@/components/safeImage/SafeImage";
import { useAppSelector } from "@/rtk/hooks";
import Link from "next/link";

export default function RightSection() {
    const { data } = useAppSelector((s) => s.banner);

    return (
        <div className="lg:col-span-3 lg:h-full order-1 lg:-order-1">
            <div className="grid grid-cols-1 gap-4 lg:grid-rows-3 lg:h-full">

                {/* Top banners – Desktop only */}
                <div className="hidden lg:flex flex-col gap-4 lg:row-span-2">
                    {[0, 1].map((index) => (
                        <Link
                            href={data[0]?.links?.[index] || "/"}
                            key={index}
                            className="relative rounded-lg overflow-hidden h-full transition-all duration-200 cursor-pointer"
                        >
                            <SafeImage
                                src={data[0]?.images?.[index]}
                                alt={data[0]?.titles?.[index] || `banner-${index}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col justify-center space-y-2 p-6">
                                <h4 className="max-w-[120px] font-bold">
                                    {data[0]?.titles?.[index]}
                                </h4>
                            </div>

                            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200" />
                        </Link>
                    ))}
                </div>

                {/* Bottom small cards */}
                <div className="grid grid-cols-2 gap-4 lg:row-span-1">
                    {[2, 3].map((index) => (
                        <Link
                            href={data[0]?.links?.[index] || "/"}
                            key={index}
                            className="relative rounded-lg overflow-hidden h-[140px] lg:h-full transition-all duration-200 cursor-pointer"
                        >
                            <SafeImage
                                src={data[0]?.images?.[index]}
                                alt={data[0]?.titles?.[index] || `banner-${index}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col justify-center space-y-1 p-3">
                                <h4 className="max-w-[120px] font-bold">
                                    {data[0]?.titles?.[index]}
                                </h4>
                            </div>

                            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200" />
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
