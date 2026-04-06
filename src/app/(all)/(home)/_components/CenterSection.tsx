"use client";
import { ToLeft, ToRight } from "@/assets";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";
import MainButton from "@/components/MainButton/MainButton";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useAppSelector } from "@/rtk/hooks";
import Image from "next/image";

export default function CenterSection() {
  const t = useTranslations();
  const swiperRef = useRef<any>(null);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  const { data: bannerData } = useAppSelector((s) => s.banner);
  const { data: sliderData } = useAppSelector((s) => s.slider);

  return (
    <div className="lg:col-span-12 lg:grid lg:grid-rows-3 gap-4 h-full">
      {/* Center Slider */}
      <div className="row-span-1 lg:row-span-3 relative rounded-lg overflow-hidden h-[350px] lg:h-full group mb-5 lg:mb-0">
        <div className="relative rounded-lg overflow-hidden h-full hover:bg-black/10!">
          <div
            className={`${t("dir") === "rtl" ? "Sponsers" : "Sponsers SponsersLeft"
              } h-full relative hover:bg-black/10!`}
          >
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="h-full"
              slidesPerView={1}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet !bg-white !opacity-50",
                bulletActiveClass:
                  "swiper-pagination-bullet-active !opacity-100 !bg-white",
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={20}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.navigation.prevEl = prevRef.current;
                // @ts-ignore
                swiper.params.navigation.nextEl = nextRef.current;
              }}
            >
              {sliderData[0]?.images?.map((item, index) => {
                const content = (
                  <div className="relative w-full h-full overflow-hidden rounded-lg cursor-pointer">
                    <Image
                      src={item || "/placeholder.png"}
                      alt="slider image"
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw" // Added sizes prop
                      className="object-cover"
                      priority={index === 0} // First image is above the fold
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/placeholder.png";
                      }}
                    />

                    {/* Hover Dark Overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-100 z-10 pointer-events-none" />

                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-[5]" />
                  </div>
                );
                return (
                  <SwiperSlide key={index} className="hover:bg-black/10">
                    <Link href="/" className="block h-full">
                      {content}
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* النص + الزر قابلين للضغط */}
          <Link
            href={sliderData[0]?.link || "/"}
            className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 ${t("dir") === "rtl" && "lg:left-auto"
              } lg:translate-x-0 ${t("dir") === "rtl"
                ? "lg:right-15 lg:text-right"
                : "lg:left-15 lg:text-left"
              } text-center z-20 space-y-3 block`}
          >
            <p className="text-sm bg-white/90 backdrop-blur-sm inline-block px-3 py-1 rounded-full">
              {t("NewProduct")}
            </p>
            <h2 className="text-3xl font-bold mb-4 lg:mb-6 leading-relaxed drop-shadow-lg">
              {sliderData[0]?.text}
            </h2>
            <MainButton text={t("ShopNow")} className="transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}