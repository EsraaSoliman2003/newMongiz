"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").then(() => setLoaded(true));
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #020617)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "24px",
          padding: "24px",
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#fff",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          3D Model Preview
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "14px",
            opacity: 0.7,
            marginBottom: "20px",
          }}
        >
          يمكنك تدوير النموذج والتكبير والتصغير بسهولة
        </p>

        <div
          style={{
            width: "100%",
            height: "400px",
            borderRadius: "16px",
            overflow: "hidden",
            background: "#000",
            position: "relative",
          }}
        >
          {!loaded && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                opacity: 0.7,
              }}
            >
              Loading 3D Model...
            </div>
          )}

          <model-viewer
            src="/test3.glb"
            auto-rotate
            camera-controls
            loading="lazy"
            poster="/poster.jpg"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}