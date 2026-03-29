"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/rtk/hooks";
import { fetchSlider } from "@/rtk/slices/slider/sliderSlice";
import SectionHeader from "../_components/SectionHeader";
import { useTranslations } from "next-intl";
import NoData from "@/components/noData/NoData";

export default function SliderDisplayPage() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: sliders, loading } = useAppSelector((state) => state.slider);

  useEffect(() => {
    dispatch(fetchSlider());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (sliders.length === 0) {
    return <NoData />;
  }

  const slider = sliders[0];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <SectionHeader
        title={t("page_title")}
        buttonText={t("edit")}
        link={`/admin/slider/edit?id=${slider.id}`}
        subtitle={t("subtitle")}
      />

      {/* Slider Content Card */}
      <div className="bg-white rounded-xl overflow-hidden mt-6">
        {/* Images Grid */}
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {t("images_title")}
          </h3>
          {slider.images && slider.images.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {slider.images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={img}
                    alt={t("image_alt", { number: idx + 1 })}
                    className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">{t("no_images")}</p>
          )}
        </div>

        {/* Text & Link */}
        <div className="p-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <p className="text-xl font-medium text-gray-800">
              {slider.text || t("untitled")}
            </p>
            {slider.link && (
              <a
                href={slider.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {slider.link || t("no_link")}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}