"use client";
import React, { useEffect, useRef, useState } from "react";
import TrustlessSecureCard from "@/components/Cards/TrustlessSecureCard";
const TrustlessSecure = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = vh / 2;
      const scrolled = center - rect.top;
      const total = rect.height;
      let percent = (scrolled / (total - center)) * 50;
      percent = Math.max(0, Math.min(percent, 100));
      setProgress(percent);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const points = [
    { top: 85, threshold: 15, align: "right", cardTop: 45, title: "Advanced Security", desc: "Encrypted, tamper-proof identity storage" },
    { top: 210, threshold: 36, align: "left", cardTop: 175, title: "Regulatory Ready", desc: "Meets global compliance standards (GDPR, FATF, etc.)" },
    { top: 340, threshold: 58, align: "right", cardTop: 305, title: "Fully Integrated", desc: "Works across Astra Wallet, Exchange, and Pay ecosystem." },
    { top: 475, threshold: 80, align: "left", cardTop: 435, title: "Scalable", desc: "From startups to enterprises, Astra grows with you." },
  ];
  return (
    <div ref={ref} className="max-w-[1100px] mx-auto w-full pb-10 pt-16 space-y-12">
      <h3 className="text-white text-center text-3xl font-medium">
        The Future of Identity is Trustless & Secure
      </h3>
      <div className="h-[600px] relative max-w-[700px] mx-auto">
        <div className="h-full w-full relative flex justify-center">
          <div className="absolute h-full w-[4px] rounded-full bg-[#2A2A2F]" />
          <div
            className="h-full w-[4px] rounded-full relative z-10"
            style={{
              background: `linear-gradient(to bottom, #FF842D, #FF2D55 ${progress}%, rgba(38,38,45,0.7) ${progress}%)`,
            }}
          />
        </div>
        {points.map((point, i) => (
          <React.Fragment key={i}>
            <span
              className={`absolute left-1/2 -translate-x-1/2 size-5 rounded-full transition-all duration-300 z-20 ${progress > point.threshold
                  ? "bg-gradient-to-r from-[#FF842D] to-[#FF2D55]"
                  : "bg-[#474747]"
                }`}
              style={{ top: `${point.top}px` }}
            />
            <div
              className={`absolute w-[80px] h-[2px] bg-[#2A2A2F] z-10`}
              style={{
                top: `${point.top + 10}px`,
                left: point.align === "left" ? "calc(50% - 80px)" : "50%",
              }}
            >
              <div
                className="h-[2px]"
                style={{
                  width: progress > point.threshold ? "100%" : "0%",
                  transition: "width 0.4s ease",
                  background:
                    "linear-gradient(to right, #FF842D, #FF2D55)",
                  float: point.align === "left" ? "right" : "left",
                }}
              />
            </div>
            <TrustlessSecureCard
              title={point.title}
              description={point.desc}
              className={`${point.align === "left" ? "left-0" : "right-0"} top-[${point.cardTop}px]`}
              active={progress > point.threshold}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
export default TrustlessSecure;