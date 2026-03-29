"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/rtk/hooks";
import { Plus } from "lucide-react";
import { addInventory } from "@/rtk/slices/inventory/inventory";
import FormImageUpload from "@/app/admin/_components/FormImageUpload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { addLoading } = useAppSelector((s) => s.inventory)
  const router = useRouter();

  // ✅ Local State
  const [form, setForm] = useState({
    name: "",
    mainPrice: "",
    quantity: "",
    image: null as File | null,
  });

  // ✅ Handle Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Save
  const handleSave = async () => {
    if (!form.name || !form.mainPrice || !form.quantity) {
      toast("Please fill all required fields");
      return;
    }

    try {
      await dispatch(
        addInventory({
          name: form.name,
          price: Number(form.mainPrice),
          quantity: Number(form.quantity),
          image: form.image || undefined,
        })
      );
      router.push("/seller/inventory")
      toast.success(t("Product added successfully"));
    } catch (e) {
      toast.error(typeof e === "string" ? e : t("Failed to add product"));
    }

    // Optional: reset form
    setForm({
      name: "",
      mainPrice: "",
      quantity: "",
      image: null,
    });
  };

  return (
    <section className="p-6 lg:p-8 w-full">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-200">
        <h3 className="text-2xl font-bold text-main">{t("AddProduct")}</h3>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row w-full justify-between gap-7">
          <div className="flex-2 flex flex-col justify-around">
            {/* Name */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("name")}
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("Price")}
              </label>
              <input
                type="number"
                name="mainPrice"
                value={form.mainPrice}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t("quantity")}
              </label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full py-2 px-4 border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200 transition-all"
              />
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 col-span-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t("image")}
            </label>
            <FormImageUpload
              name="image"
              previewUrl={form.image ? URL.createObjectURL(form.image) : null}
              onChange={handleChange}
              showClearButton
              square
              className="w-full border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-3 mt-4 justify-end">
        <button
          type="button"
          onClick={handleSave}
          className="py-2 px-6 text-white bg-main flex items-center gap-2"
          disabled={addLoading}
        >
          <Plus className="w-4 h-4" />
          {t("Add")}
        </button>
      </div>
    </section>
  );
}