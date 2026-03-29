import {
  HiHome,
  HiOutlineBriefcase,
  HiOutlinePhotograph,
  HiOutlineClipboardList,
  HiOutlineStar,
  HiOutlineQuestionMarkCircle,
  HiOutlineMail,
  HiOutlineDotsHorizontal,
  HiOutlineUserGroup,
  HiOutlineCog,
} from "react-icons/hi";

import { MenuItem } from "./types";

export const getAdminMenu = (t: any): MenuItem[] => [
  {
    name: t("menu_home"),
    icon: <HiHome className="text-xl" />,
    children: [
      { name: t("menu_why_us_design_1"), path: "/admin/hero/design-1" },
      { name: t("menu_why_us_design_2"), path: "/admin/hero/design-2" },
      { name: t("menu_why_us_design_3"), path: "/admin/hero/design-3" },
    ],
  },
  {
    name: t("menu_why_us"),
    icon: <HiOutlineBriefcase className="text-xl" />,
    children: [
      { name: t("menu_why_us_design_1"), path: "/admin/why_us/design-1" },
      { name: t("menu_why_us_design_2"), path: "/admin/why_us/design-2" },
    ],
  },
  {
    name: t("menu_services"),
    icon: <HiOutlineBriefcase className="text-xl" />,
    children: [
      { name: t("menu_why_us_design_1"), path: "/admin/services/design-1" },
      { name: t("menu_why_us_design_2"), path: "/admin/services/design-2" },
      { name: t("menu_why_us_design_3"), path: "/admin/services/design-3" },
      { name: t("menu_why_us_design_4"), path: "/admin/services/design-4" },
    ],
  },
  {
    name: t("menu_portfolio"),
    icon: <HiOutlinePhotograph className="text-xl" />,
    children: [
      { name: t("menu_why_us_design_1"), path: "/admin/portfolio/design-1" },
      { name: t("menu_why_us_design_2"), path: "/admin/portfolio/design-2" },
      { name: t("menu_why_us_design_3"), path: "/admin/portfolio/design-3" },
    ],
  },
  {
    name: t("menu_how_work"),
    icon: <HiOutlineClipboardList className="text-xl" />,
    children: [
      { name: t("menu_why_us_design_1"), path: "/admin/how_work/design-1" },
    ],
  },
  {
    name: t("menu_reviews"),
    icon: <HiOutlineStar className="text-xl" />,
    children: [
      { name: t("menu_why_us_design_1"), path: "/admin/reviews/design-1" },
      { name: t("menu_why_us_design_2"), path: "/admin/reviews/design-2" },
    ],
  },
  {
    name: t("menu_faq"),
    icon: <HiOutlineQuestionMarkCircle className="text-xl" />,
    children: [
      { name: t("menu_why_us_design_1"), path: "/admin/faq/design-1" },
    ],
  },
  {
    name: t("menu_contact"),
    icon: <HiOutlineMail className="text-xl" />,
    children: [
      { name: t("menu_why_us_design_1"), path: "/admin/contact/design-1" },
    ],
  },
  {
    name: t("other"),
    icon: <HiOutlineDotsHorizontal className="text-xl" />,
    children: [
      { name: t("menu_why_us_design_1"), path: "/admin/other/design-1" },
      { name: t("menu_why_us_design_2"), path: "/admin/other/design-2" },
      { name: t("menu_why_us_design_3"), path: "/admin/other/design-3" },
      { name: t("menu_why_us_design_4"), path: "/admin/other/design-4" },
      { name: t("menu_why_us_design_5"), path: "/admin/other/design-5" },
      { name: t("menu_why_us_design_6"), path: "/admin/other/design-6" },
      { name: t("menu_why_us_design_7"), path: "/admin/other/design-7" },
    ],
  },
  {
    name: t("menu_users"),
    path: "/admin/users",
    icon: <HiOutlineUserGroup className="text-xl" />,
  },
  {
    name: t("menu_settings"),
    path: "/admin/settings",
    icon: <HiOutlineCog className="text-xl" />,
  },
];
