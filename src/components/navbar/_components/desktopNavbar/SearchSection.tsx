"use client";

import MainButton from "@/components/MainButton/MainButton";
import { Mic, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/rtk/hooks";
import {
    fetchSearchHistory,
    deleteSearchHistory,
    searchProducts
} from "@/rtk/slices/search/searchSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface SidebarHeaderProps {
    onClose?: () => void;
    hideButton?: boolean;
}

export default function SearchSection({ onClose, hideButton }: SidebarHeaderProps) {
    const { token } = useAuth();
    const t = useTranslations();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { history } = useAppSelector((s) => s.search);

    const [keyword, setKeyword] = useState("");
    const [listening, setListening] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch history on mount
    useEffect(() => {
        if (token) {
            dispatch(fetchSearchHistory());
        }
    }, [dispatch]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* ===========================
       Read Brand From URL
    =========================== */
    const currentPath = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (currentPath === "/") {
            setKeyword("")
        }
    }, [currentPath]);

    /* ===========================
       Read query From URL
    =========================== */
    const queryParam = searchParams.get("query");

    useEffect(() => {
        if (queryParam) {
            setKeyword(queryParam);
        }
    }, [queryParam]);
    /* ================= Voice Search ================= */
    const handleVoiceSearch = () => {
        if (typeof window === "undefined") return;

        const SpeechRecognition =
            (window as any).SpeechRecognition ||
            (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Your browser does not support voice search");
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.lang = t("dir") === "rtl" ? "ar-EG" : "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();
        setListening(true);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setKeyword(transcript);
            if (inputRef.current) inputRef.current.value = transcript;
            setListening(false);
            // No automatic search – just set the keyword
        };

        recognition.onerror = () => setListening(false);
        recognition.onend = () => setListening(false);
    };

    /* ================= Submit Search ================= */
    const handleSearch = () => {
        if (!keyword.trim()) return;

        // Navigate
        router.push(`/products?query=${keyword}`);

        // Dispatch search
        dispatch(searchProducts(keyword))
            .unwrap() // optional: to wait for success/failure
            .then(() => {
                // After successful search, refresh history
                if (token) {
                    dispatch(fetchSearchHistory());
                }
            })
            .catch((err) => {
                console.error("Search failed", err);
            });
        setIsFocused(false);
        onClose?.(); // ✅ call the onClose function
    };

    /* ================= Delete History Item ================= */
    const handleDeleteHistory = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(deleteSearchHistory(id));
    };

    /* ================= Decide what to show in dropdown ================= */
    // Filter history when typing or limit to first 8 when input empty
    const filteredHistory = keyword.trim()
        ? history
            .filter((item) =>
                item.keyword.toLowerCase().includes(keyword.toLowerCase())
            )
            .slice(0, 8) // limit to 8 matching items
        : history.length > 0
            ? history.slice(0, 8) // limit to first 8 items if input empty
            : []; // if no history, empty array

    // Show history only if there is filtered history
    const showHistory = isFocused && filteredHistory.length > 0;

    return (
        <div className="flex flex-3 gap-1 max-w-2xl h-12" ref={containerRef}>
            <div className="relative flex items-center w-full max-w-2xl bg-white rounded-md border border-gray-200 focus-within:ring-2 focus-within:ring-orange-400/30 focus-within:border-orange-400 transition-all duration-200">
                <div className="justify-center items-center w-full flex">
                    <Search size={18} className="absolute left-4 text-gray-400" />

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={t("SearchPlaceholder")}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                        className="w-full py-2.5 pl-11 pr-12 rounded-full outline-none text-sm text-gray-700 placeholder-gray-400"
                    />

                    <button
                        onClick={handleVoiceSearch}
                        className={`absolute right-2 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition ${listening ? "bg-orange-100 text-orange-500 animate-pulse" : ""
                            }`}
                        type="button"
                    >
                        <Mic size={18} />
                    </button>
                </div>

                {/* History */}
                {showHistory && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md z-50 max-h-60 overflow-y-auto">
                        {filteredHistory.map((item) => (
                            <div key={item.id} className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer group">
                                <Link
                                    href={`/products?query=${item.keyword}`}
                                    className="flex-1"
                                    onClick={() => {
                                        setKeyword(item.keyword);
                                        if (inputRef.current) inputRef.current.value = item.keyword;
                                        dispatch(searchProducts(item.keyword))
                                            .unwrap()
                                            .then(() => {
                                                if (token) {
                                                    dispatch(fetchSearchHistory());
                                                }
                                            }); // refresh history
                                        setIsFocused(false);
                                        onClose?.(); // ✅ call the onClose function
                                    }}
                                >
                                    <span className="text-sm text-gray-700">{item.keyword}</span>
                                </Link>

                                <button
                                    onClick={(e) => handleDeleteHistory(item.id, e)}
                                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Search Button */}
            {!hideButton && (
                <MainButton text={t("Search")} onClick={handleSearch} />
            )}
        </div>
    );
}