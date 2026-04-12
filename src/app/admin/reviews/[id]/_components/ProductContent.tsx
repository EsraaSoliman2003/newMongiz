"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/rtk/hooks";
import { fetchReviewsByProduct, deleteReview, UserProductReview } from "@/rtk/slices/userProductReviewSlice/userProductReviewSlice";
import { Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import SectionHeader from "@/app/admin/_components/SectionHeader";
import NoData from "@/components/noData/NoData";
import CardReview from "./CardReview";

/* =========================
   Skeleton
========================= */
function CardReviewSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 flex justify-between animate-pulse">
            <div className="flex gap-3 w-full">
                <div className="w-10 h-10 rounded-full bg-gray-200" />

                <div className="flex-1 space-y-2">
                    <div className="h-3 w-32 bg-gray-200 rounded" />

                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
                        ))}
                    </div>

                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-2/3 bg-gray-200 rounded" />
                </div>
            </div>

            <div className="w-6 h-6 bg-gray-200 rounded" />
        </div>
    );
}

/* =========================
   Page
========================= */
export default function ProductContent() {
    const params = useParams();
    const id = params?.id;

    const t = useTranslations();
    const dispatch = useAppDispatch();

    const { items, loading } = useAppSelector(
        (s) => s.userProductReview
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchReviewsByProduct({ productId: Number(id) }));
        }
    }, [dispatch, id]);

    return (
        <div className="p-4 md:p-8 space-y-6">
            <SectionHeader
                title={t("reviewsTitle")}
                subtitle={t("reviewsSubtitle")}
            />

            {/* Loading */}
            {loading && (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <CardReviewSkeleton key={i} />
                    ))}
                </div>
            )}

            {/* Data */}
            {!loading && items.length > 0 && (
                <div className="space-y-4">
                    {items.map((review) => (
                        <CardReview
                            key={review.reviewId}
                            review={review}
                        />
                    ))}
                </div>
            )}

            {/* Empty */}
            {!loading && items.length === 0 && <NoData />}
        </div>
    );
}
