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
        path: "/admin",
    },
    {
        name: t("menu_why_us"),
        icon: <HiOutlineBriefcase className="text-xl" />,
        path: "/adminظ/why_us",

    },
    {
        name: t("menu_services"),
        icon: <HiOutlineBriefcase className="text-xl" />,
        path: "/admin/services",
    },
    {
        name: t("menu_portfolio"),
        icon: <HiOutlinePhotograph className="text-xl" />,
        path: "/admin/portfolio",
    },
    {
        name: t("menu_how_work"),
        icon: <HiOutlineClipboardList className="text-xl" />,
        path: "/admin/how_work",
    },
    {
        name: t("menu_reviews"),
        icon: <HiOutlineStar className="text-xl" />,
        path: "/admin/reviews",
    },
    {
        name: t("menu_faq"),
        icon: <HiOutlineQuestionMarkCircle className="text-xl" />,
        path: "/admin/faq",
    },
    {
        name: t("menu_contact"),
        icon: <HiOutlineMail className="text-xl" />,
        path: "/admin/contact",
    },
    {
        name: t("other"),
        icon: <HiOutlineDotsHorizontal className="text-xl" />,
        path: "/admin/other",
    },
    {
        name: t("menu_users"),
        icon: <HiOutlineUserGroup className="text-xl" />,
        path: "/admin/users",
    },
    {
        name: t("menu_settings"),
        icon: <HiOutlineCog className="text-xl" />,
        path: "/admin/settings",
    },
];
