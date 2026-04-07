"use client";

import { Mail, X, Send, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";

export default function EmailStatusButton() {
    const t = useTranslations();
    const { emailConfirmed, token } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [userEmail, setUserEmail] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setModalOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    useEffect(() => {
        const user = getCookie("user");
        if (user) {
            try {
                const parsedUser = JSON.parse(user as string);
                setUserEmail(parsedUser.email || "");
            } catch (err) {
                console.error("Failed to parse user cookie:", err);
            }
        }
    }, []);

    if (emailConfirmed) return null;

    const handleVerify = async () => {
        if (!userEmail) return toast.error(t("Invalid email"));
        if (cooldown > 0)
            return toast.info(t("Please wait {seconds} seconds before trying again", { seconds: cooldown }));

        setLoading(true);
        try {
            const res = await fetch(
                `${base}/api/Account/Re-ConfirmEmail?email=${encodeURIComponent(userEmail)}`,
                {
                    method: "GET",
                    headers: {
                        "Accept-Language": "ar",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.ok) {
                toast.success(t("We have sent a confirmation email link to your inbox"));
                setModalOpen(false);
                setCooldown(60);
            } else {
                const data = await res.json();
                toast.error(data?.title || t("Failed to send confirmation email"));
            }
        } catch (err) {
            toast.error(t("Something went wrong Please try again later"));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setModalOpen(true)}
                className="relative bg-gradient-to-r from-red-500 to-orange-500 p-2 rounded-full shadow-md hover:shadow-lg transition duration-300"
                aria-label={t("Email not confirmed")}
            >
                <Mail className="w-5 h-5 text-white" />
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
                    <AlertCircle className="w-3 h-3 text-red-600" />
                </div>
            </button>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div
                        ref={modalRef}
                        className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform animate-in slide-in-from-bottom-4 duration-300 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-white" />
                                <h2 className="text-lg font-semibold text-white">{t("Your Email Not Confirmed")}</h2>
                            </div>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-white/90 hover:text-white transition-colors"
                                aria-label={t("Close")}
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>



                        {/* Body */}
                        <div className="p-6 space-y-4">
                            <p className="text-gray-700">
                                {t("Your email")}: <span className="font-medium">{userEmail}</span> {t("is not confirmed")}
                            </p>
                            <p className="text-gray-700">
                                {t("To confirm your email, we will send a confirmation link to")}: <span className="font-medium">{userEmail}</span>
                            </p>

                            <ul className="list-inside list-disc text-gray-600 text-sm space-y-1">
                                <li>{t("Check your inbox and click the verification link")}</li>
                                <li>{t("The link expires in 24 hours")}</li>
                                <li>{t("Check your spam folder if you don't see the email")}</li>
                            </ul>

                            {cooldown > 0 && (
                                <div className="bg-gray-100 rounded-lg p-3 text-center text-gray-600 text-sm">
                                    {t("Please wait")} <span className="font-medium">{cooldown}</span> {t("seconds before requesting again")}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition font-medium"
                                >
                                    {t("Cancel")}
                                </button>
                                <button
                                    onClick={handleVerify}
                                    disabled={loading || cooldown > 0}
                                    className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            {t("Sending")}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            {t("Send Confirmation")}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center text-xs text-gray-500">
                            {t("Need help?")}{" "}
                            <button className="text-blue-600 hover:underline">{t("Contact Support")}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}