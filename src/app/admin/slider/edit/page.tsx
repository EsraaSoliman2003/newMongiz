"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/rtk/hooks";
import {
    fetchSliderById,
    updateSlider,
    clearSelectedSlider,
} from "@/rtk/slices/slider/sliderSlice";
import { Trash2, Upload, Loader2, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Type } from "lucide-react";
import FormSubmitButton from "../../_components/FormSubmitButton";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function EditSliderPage() {
    const t = useTranslations(); // default namespace
    const router = useRouter();
    const searchParams = useSearchParams();
    const sliderId = searchParams.get("id");
    const dispatch = useAppDispatch();
    const { selected: slider, loading, error } = useAppSelector((state) => state.slider);

    const [link, setLink] = useState("");
    const [text, setText] = useState("");
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (sliderId) dispatch(fetchSliderById(Number(sliderId)));
        return () => {
            dispatch(clearSelectedSlider());
        };
    }, [dispatch, sliderId]);

    useEffect(() => {
        if (slider) {
            setLink(slider.link);
            setText(slider.text);
            setExistingImages(slider.images || []);
        }
    }, [slider]);

    useEffect(() => {
        return () => {
            newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [newImagePreviews]);

    const handleImageDelete = (index: number, isExisting: boolean) => {
        if (isExisting) setExistingImages((prev) => prev.filter((_, i) => i !== index));
        else {
            setNewImages((prev) => prev.filter((_, i) => i !== index));
            setNewImagePreviews((prev) => {
                URL.revokeObjectURL(prev[index]);
                return prev.filter((_, i) => i !== index);
            });
        }
    };

    const processFiles = (files: FileList | File[] | null) => {
        if (!files || files.length === 0) return;
        const fileArray = Array.from(files).filter(file => file.type.startsWith('image/'));
        if (fileArray.length === 0) return;
        setNewImages((prev) => [...prev, ...fileArray]);
        setNewImagePreviews((prev) => [...prev, ...fileArray.map((f) => URL.createObjectURL(f))]);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        processFiles(e.target.files);
        e.target.value = '';
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        processFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleSave = async () => {
        if (!sliderId) return;
        setIsSaving(true);
        setSaveMessage(null);
        try {
            await dispatch(
                updateSlider({
                    Id: Number(sliderId),
                    Link: link,
                    Text: text,
                    ExistingImages: existingImages,
                    NewImages: newImages,
                })
            ).unwrap();
            router.push("/admin/slider")
            toast(t("update_success"))
        } catch (err) {
            setSaveMessage({ type: "error", text: typeof err === "string" ? err : t("update_failed") });
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
            </div>
        );
    }


    if (!slider)
        return (
            <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
                <div className="bg-white p-6 rounded-2xl shadow-xl text-yellow-600 border-r-4 border-yellow-500">
                    {t("not_found")}
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-linear-to-br py-8 px-4" dir="rtl">
            <div className="">
                <div className="">
                    {/* Image section */}
                    <div className="p-8 border-b border-gray-100">
                        {/* Image dropzone */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`mb-8 border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${isDragging
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                                }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                            <p className="text-gray-600 font-medium">
                                {t("click_to_upload")}
                            </p>
                            <p className="text-sm text-gray-400 mt-1">
                                {t("supported_formats")}
                            </p>
                            {newImages.length > 0 && (
                                <p className="text-sm text-indigo-600 mt-2">
                                    {t("selected_count", { count: newImages.length })}
                                </p>
                            )}
                        </div>

                        {/* Image grid */}
                        {existingImages.length > 0 || newImagePreviews.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {existingImages.map((img, idx) => (
                                    <div
                                        key={`existing-${idx}`}
                                        className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="aspect-video">
                                            <img
                                                src={img}
                                                alt={t("image_number", { number: idx + 1 })}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <button
                                            onClick={() => handleImageDelete(idx, true)}
                                            className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all transform hover:scale-110"
                                            aria-label={t("delete_image")}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                                {newImagePreviews.map((img, idx) => (
                                    <div
                                        key={`new-${idx}`}
                                        className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ring-2 ring-indigo-300"
                                    >
                                        <div className="aspect-video">
                                            <img
                                                src={img}
                                                alt={t("new_image_number", { number: idx + 1 })}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <button
                                            onClick={() => handleImageDelete(idx, false)}
                                            className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all transform hover:scale-110"
                                            aria-label={t("delete_image")}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <span className="absolute bottom-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full shadow">
                                            {t("new")}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                                <p className="text-gray-500">{t("no_images_added")}</p>
                                <p className="text-sm text-gray-400 mt-1">{t("upload_area_above")}</p>
                            </div>
                        )}
                    </div>

                    {/* Details section */}
                    <div className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="relative">
                                <label htmlFor="link" className="block text-sm font-medium text-gray-600 mb-1 mr-1">
                                    {t("url_link")}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <LinkIcon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="link"
                                        type="url"
                                        placeholder="https://example.com"
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50/50"
                                    />
                                </div>
                            </div>
                            <div className="relative">
                                <label htmlFor="text" className="block text-sm font-medium text-gray-600 mb-1 mr-1">
                                    {t("slider_text")}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <Type className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="text"
                                        type="text"
                                        placeholder={t("enter_slider_text")}
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50/50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer with actions */}
                    <div className="px-8 py-4 bg-gray-50/80 border-t border-gray-100 flex flex-wrap items-center gap-4">
                        <div className="flex-1 flex justify-end">
                            <FormSubmitButton
                                text={t("update_slider")}
                                loading={isSaving}
                                onClick={handleSave}
                                className="min-w-[160px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}