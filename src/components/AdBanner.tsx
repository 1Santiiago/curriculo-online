"use client";

import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      const ads = document.querySelectorAll<HTMLDivElement>(".adsbygoogle");
      ads.forEach((ad) => {
        // só inicializa se ainda não tiver sido processado
        if (!ad.getAttribute("data-adsbygoogle-status")) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      });
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="pub-9108265555174727"
      data-ad-slot="XXXX"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
