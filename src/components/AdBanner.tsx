"use client";

import React, { useEffect } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
  label?: string;
}

export default function AdBanner({
  slot = "0000000000",
  format = "auto",
  className = "",
  label = "스폰서 광고",
}: AdBannerProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";
  const isAdsenseConfigured = client && client !== "ca-pub-0000000000000000";

  useEffect(() => {
    if (isAdsenseConfigured && typeof window !== "undefined") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense Error:", err);
      }
    }
  }, [isAdsenseConfigured]);

  return (
    <aside
      aria-label={label}
      className={`relative my-6 overflow-hidden rounded-2xl border border-stone-200/80 bg-stone-50/80 p-4 text-center transition hover:border-stone-300 ${className}`}
    >
      <div className="mb-2 flex items-center justify-between text-[11px] font-medium tracking-wider text-stone-400">
        <span>SPONSORED</span>
        <span>광고 수익으로 서비스가 무료 운영됩니다</span>
      </div>

      {isAdsenseConfigured ? (
        <div className="overflow-hidden rounded-xl bg-white p-2">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        /* 광고 설정 전 미리보기 플레이스홀더 */
        <div className="flex min-h-[90px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-stone-300 bg-white/70 py-4 text-xs text-stone-500 shadow-sm">
          <div className="flex flex-col items-center gap-1">
            <span className="font-semibold text-stone-700">광고 배너 영역 ({format})</span>
            <span className="text-[11px] text-stone-400">
              구글 애드센스 / 카카오 애드핏 연동 대기 중 (Slot: {slot})
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
