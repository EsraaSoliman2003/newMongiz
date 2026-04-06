"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import MainButton from "@/components/MainButton/MainButton";
import { useAppSelector } from "@/rtk/hooks";

export default function ConfirmEmailPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const { logo, loading: logoLoading } = useAppSelector((s) => s.logo);

  useEffect(() => {
    // Read email and token from URL
    const emailParam = searchParams.get("email");
    const tokenParam = searchParams.get("token");

    setEmail(emailParam || "");
    setToken(tokenParam || "");

    console.log("Email from URL:", emailParam);
    console.log("Token from URL:", tokenParam);
  }, [searchParams]);

  const handleVerify = async () => {
    if (!email || !token) {
      setStatus("Invalid email or token");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("Email verified successfully! 🎉");
      } else {
        setStatus(data.message || "Verification failed");
      }
    } catch (err) {
      setStatus("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-2xl px-8 py-10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-6">
          {logoLoading ? (
            <div className="w-52 h-20 bg-gray-700 animate-pulse rounded"></div>
          ) : (
            <Image
              src={logo?.logoDarkMode || "/default-logo.png"}
              alt="Logo"
              width={220}
              height={220}
            />
          )}
        </Link>

        {/* Title */}
        <h1 className="text-xl font-semibold text-center mb-2">
          Confirm Your Email
        </h1>
        <p className="text-sm text-center text-white/70 mb-7 leading-relaxed">
          {email
            ? `A verification email was sent to ${email}. Click the button below to verify your email.`
            : "No email provided"}
        </p>

        {/* Verify Button */}
        <MainButton
          onClick={handleVerify}
          text={loading ? "Verifying..." : "Verify Email"}
          loading={loading}
          className="w-full mb-6"
        />

        {status && (
          <p className="text-center mt-4 text-sm text-white/80">{status}</p>
        )}

        {/* Link to Login */}
        <p className="text-center text-sm text-white/70 mt-6">
          Already verified?{" "}
          <Link href="/login" className="text-orange-400 hover:underline">
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
}