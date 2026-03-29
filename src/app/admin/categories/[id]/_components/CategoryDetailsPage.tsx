"use client";

import { useAppDispatch, useAppSelector } from "@/rtk/hooks";
import { useEffect } from "react";
import { deleteCategory, fetchCategoryById } from "@/rtk/slices/category/categoriesSlice";
import Image from "next/image";
import SubCategoryGrid from "./SubCategoryGrid";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface Props {
    categoryId: number;
}

const CategoryDetailsPage: React.FC<Props> = ({ categoryId }) => {
    const t = useTranslations();
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchCategoryById(categoryId));
    }, [dispatch, categoryId]);

    const { selectedSimpleCategory, loading } = useAppSelector((s) => s.categories);

    const handleDelete = () => {
        toast(
            <div className="flex items-center justify-between gap-3 text-sm">
                <span>{t("You want to delete this category")}</span>
                <div className="flex gap-2">
                    <button
                        className="bg-red-500 text-white px-2 py-0.5 rounded hover:bg-red-600 transition"
                        onClick={async () => {
                            const res = await dispatch(deleteCategory(Number(categoryId)));
                            if (deleteCategory.fulfilled.match(res)) {
                                router.push("/admin/categories");
                                toast.success(t("Category deleted successfully"));
                            } else {
                                toast.error(t("Failed to delete category"));
                            }
                        }}
                    >
                        {t("Delete")}
                    </button>
                    <button
                        className="bg-gray-300 text-black px-2 py-0.5 rounded hover:bg-gray-400 transition"
                        onClick={() => toast.dismiss()}
                    >
                        {t("Cancel")}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <section className="p-4 lg:p-10 space-y-8">
            {loading ? (
                /* ================= Skeleton ================= */
                <div className="flex items-center justify-between gap-4 mb-6 p-4 bg-white rounded-lg shadow animate-pulse">
                    <div className="flex gap-4">
                        {/* Image Skeleton */}
                        <div className="w-24 h-24 rounded bg-gray-200" />
                        {/* Text Skeleton */}
                        <div className="flex flex-col justify-center gap-3">
                            <div className="h-5 w-40 bg-gray-200 rounded" />
                            <div className="h-4 w-24 bg-gray-100 rounded" />
                        </div>
                    </div>
                    {/* Buttons Skeleton */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full" />
                        <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    </div>
                </div>
            ) : selectedSimpleCategory ? (
                /* ================= Real Data ================= */
                <div>
                    <div className="flex items-center justify-between gap-4 mb-6 p-4 bg-white rounded-lg shadow">
                        <div className="flex gap-4">
                            {selectedSimpleCategory.image && (
                                <div className="w-24 h-24 relative rounded overflow-hidden bg-gray-50">
                                    <Image
                                        src={selectedSimpleCategory.image}
                                        alt={selectedSimpleCategory.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}
                            <div className="flex flex-col justify-center">
                                <h2 className="text-xl font-semibold">
                                    {selectedSimpleCategory.name}
                                </h2>
                            </div>
                        </div>

                        {/* Icon buttons with consistent styling */}
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/admin/categories/${categoryId}/edit`}
                                className="flex items-center justify-center w-10 h-10 rounded-full text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition"
                                title={t("Edit")}
                            >
                                <FiEdit2 size={20} />
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="flex items-center justify-center w-10 h-10 rounded-full text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                                title={t("Delete")}
                            >
                                <FiTrash2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            <SubCategoryGrid categoryId={categoryId} />
        </section>
    );
};

export default CategoryDetailsPage;