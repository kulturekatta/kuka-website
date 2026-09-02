"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_CONSENT_KEY,
} from "./CookieBanner";

const META_PIXEL_ID = "1113624164430197";
const META_PIXEL_SCRIPT_ID = "kuka-meta-pixel-script";

type MetaPixelFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: MetaPixelFunction;
  loaded?: boolean;
  version?: string;
};

type MetaWindow = Window & {
  fbq?: MetaPixelFunction;
  _fbq?: MetaPixelFunction;
  __kukaMetaPixelInitialized?: boolean;
  __kukaMetaLastPageView?: string;
};

function hasOptionalCookieConsent() {
  return (
    window.localStorage.getItem(COOKIE_CONSENT_KEY) ===
    "accepted"
  );
}

function initialiseMetaPixel() {
  const metaWindow = window as MetaWindow;

  if (!metaWindow.fbq) {
    const queue: unknown[][] = [];

    const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) {
        fbq.callMethod(...args);
    } else {
        queue.push(args);
    }
    }) as MetaPixelFunction;

    fbq.queue = queue;

    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";

    metaWindow.fbq = fbq;
    metaWindow._fbq = fbq;
  }

  if (!document.getElementById(META_PIXEL_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = META_PIXEL_SCRIPT_ID;
    script.async = true;
    script.src =
      "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  if (!metaWindow.__kukaMetaPixelInitialized) {
    metaWindow.fbq("init", META_PIXEL_ID);
    metaWindow.__kukaMetaPixelInitialized = true;
  }

  return metaWindow;
}

function trackPageView() {
  if (!hasOptionalCookieConsent()) {
    return;
  }

  const metaWindow = initialiseMetaPixel();
  const currentPage = `${window.location.pathname}${window.location.search}`;

  if (metaWindow.__kukaMetaLastPageView === currentPage) {
    return;
  }

  metaWindow.fbq?.("track", "PageView");
  metaWindow.__kukaMetaLastPageView = currentPage;
}

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView();

    const handleConsentChange = () => {
      trackPageView();
    };

    window.addEventListener(
      COOKIE_CONSENT_EVENT,
      handleConsentChange,
    );

    return () => {
      window.removeEventListener(
        COOKIE_CONSENT_EVENT,
        handleConsentChange,
      );
    };
  }, [pathname]);

  return null;
}