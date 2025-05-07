import { cn } from "@/lib/utils"

interface AdBannerProps {
  className?: string
  size: "leaderboard" | "rectangle" | "skyscraper" | "banner"
  slot?: string
}

export function AdBanner({ className, size, slot = "default" }: AdBannerProps) {
  // Size dimensions based on standard ad formats
  const dimensions = {
    leaderboard: { width: 728, height: 90 },
    rectangle: { width: 300, height: 250 },
    skyscraper: { width: 160, height: 600 },
    banner: { width: "100%", height: 90 },
  }

  const { width, height } = dimensions[size]

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200 rounded-md",
        className,
      )}
      style={{ width, height }}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    >
      <div className="text-xs text-slate-400 font-medium">Advertisement</div>
      {/* In a real implementation, you would add the actual AdSense code here */}
      {/* 
        Example AdSense code:
        <ins className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true">
        </ins>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      */}
    </div>
  )
}