"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { captureInquiryAttribution } from "../lib/campaign-attribution";

// Record the first landing page before visitors move to another site page.
export default function InquiryAttributionTracker() {
  const pathname = usePathname();
  useEffect(() => { captureInquiryAttribution(); }, [pathname]);
  return null;
}
