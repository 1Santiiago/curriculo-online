"use client";

import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle block my-4"
      style={{ display: "block" }}
      data-ad-client="pub-9108265555174727"
      data-ad-slot="YYYYYYY"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
