"use client";
import LeftSection from './LeftSection';
import CenterSection from './CenterSection';
import RightSection from './RightSection';
import { useAppDispatch, useAppSelector } from '@/rtk/hooks';
import { useEffect } from 'react';
import { fetchBanners } from '@/rtk/slices/banner/bannerSlice';
import { fetchSlider } from '@/rtk/slices/slider/sliderSlice';

export default function HomeHeroSection() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchBanners());
        dispatch(fetchSlider());
    }, [dispatch]);

    const { loading: bannerLoading } = useAppSelector((s) => s.banner);
    const { loading: sliderLoading } = useAppSelector((s) => s.slider);

    if (bannerLoading || sliderLoading) {
        return (
            <section className="mx-auto py-6 px-4 lg:px-15 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-auto lg:h-[70vh]">

                {/* Right Skeleton */}
                <div className="lg:col-span-3 grid grid-rows-3 gap-4">
                    <div className="row-span-2 bg-gray-200 animate-pulse rounded-lg" />
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-200 animate-pulse rounded-lg h-[140px] lg:h-full" />
                        <div className="bg-gray-200 animate-pulse rounded-lg h-[140px] lg:h-full" />
                    </div>
                </div>

                {/* Center Skeleton */}
                <div className="lg:col-span-7 lg:grid lg:grid-rows-3 gap-4 h-full">

                    {/* Slider Skeleton */}
                    <div className="row-span-1 lg:row-span-2 relative rounded-lg overflow-hidden h-[350px] lg:h-full mb-5 lg:mb-0">
                        <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
                    </div>

                    {/* Bottom 3 Cards Skeleton */}
                    <div className="row-span-1">
                        <div className="grid grid-cols-3 gap-4 h-full">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="relative rounded-lg overflow-hidden bg-gray-200 animate-pulse h-[120px] lg:h-full"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Left Skeleton */}
                <div className="hidden lg:block lg:col-span-2 bg-gray-200 animate-pulse rounded-lg" />

            </section>
        );
    }

    return (
        <section className="mx-auto py-6 px-4 lg:px-15 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-auto lg:h-[70vh]">
            <RightSection />
            <CenterSection />
            <LeftSection />
        </section>
    );
}
