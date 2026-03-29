"use client";

import Image from "next/image";
import Link from "next/link";
import { pen } from "@/assets";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

import { useAppDispatch } from "@/rtk/hooks";
import { deleteProduct } from "@/rtk/slices/products/productsPaginationSlice";
import { useTranslations } from "next-intl";

interface Props {
  id: string;
  name: string;
  price: number;
  image?: string;
  status?: string;
}

const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  image,
  status = "Active",
}) => {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    toast(t("deleteConfirmTitle"), {
      description: t("deleteConfirmDescription"),
      action: {
        label: t("deleteConfirmAction"),
        onClick: async () => {
          try {
            await dispatch(deleteProduct(Number(id))).unwrap();
            toast.success(t("deleteSuccess"));
          } catch (e) {
            toast.error(typeof e === "string" ? e : t("deleteError"));
          }
        },
      },
      cancel: {
        label: "إلغاء",
        onClick: () => {
          toast.info(t("deleteCancel"));
        },
      },
    });
  };

  return (
    <div className="rounded-xl bg-white box-shadow">
      {/* Image */}
      <div className="px-2 pt-2">
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-50">
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex items-center justify-between">
        <div>
          <p className="bg-[#50EE7029] text-[#50EE70] w-fit py-0.5 px-1.5 font-bold text-xs rounded-[6px]">
            {status === "Active" ? t("statusActive") : t("statusInactive")}
          </p>

          <h3 className="mt-2 text-sm title-color line-clamp-1">{name}</h3>
          {/* <p className="text-sm text-gray-600 mt-1">{price}</p> */}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Edit */}
          <Link
            href={`/seller/products/addproduct?id=${id}`}
            className="relative w-5 h-5 block"
            aria-label={t("edit")}
          >
            <Image src={pen} alt={t("edit")} fill sizes="20px" />
          </Link>

          {/* Delete */}
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 transition"
            aria-label={t("deleteLabel")}
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
