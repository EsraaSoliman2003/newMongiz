"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getCookie } from "cookies-next";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "147350394688-9n2a47jbigec3rq5td0a465l8deuijp6.apps.googleusercontent.com";

export default function ProtectedAuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenCookie = token || (getCookie("token") as string | undefined);

    if (tokenCookie) {
      const rolesCookie = getCookie("roles") as string | undefined;
      const roles = rolesCookie ? JSON.parse(rolesCookie) : [];

      if (roles.includes("ADMIN")) {
        router.replace("/admin");
      } else if (roles.includes("SELLER")) {
        router.replace("/seller");
      } else {
        router.replace("/");
      }
    } else {
      setLoading(false);
    }
  }, [token, router]);

  if (loading) {
    return (
      <main
        className="min-h-screen flex items-center justify-center bg-center bg-no-repeat bg-cover bg-fixed"
        style={{ backgroundImage: "url('/login.png')" }}
      >
        <div className="w-full max-w-md p-8 space-y-4 bg-white/80 rounded-lg shadow-lg animate-pulse">
          <div className="h-10 bg-gray-300 rounded" />
          <div className="h-10 bg-gray-300 rounded" />
          <div className="h-10 bg-gray-300 rounded" />
          <div className="h-10 bg-gray-300 rounded w-1/2" />
        </div>
      </main>
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <main
        className="min-h-screen bg-center bg-no-repeat bg-cover bg-fixed"
        style={{ backgroundImage: "url('/login.png')" }}
      >
        {children}
      </main>
    </GoogleOAuthProvider>
  );
}
