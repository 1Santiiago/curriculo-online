import { useEffect } from "react";

export default function AdBanner() {
  useEffect(() => {
    try {
      const ads = document.querySelectorAll(".adsbygoogle");
      ads.forEach((ad) => {
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
      data-ad-client="ca-pub-XXXX"
      data-ad-slot="XXXX"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
