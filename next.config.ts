import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "font-src 'self' data:",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob:",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  `connect-src 'self'${isProduction ? "" : " ws: wss:"}`,
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  ...(isProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/kuka-universe/5-senses",
        destination: "/kuka-universe/senses",
        permanent: true,
      },
      {
        source: "/universe",
        destination: "/kuka-universe",
        permanent: true,
      },
      {
        source: "/explore",
        destination: "/experiences",
        permanent: true,
      },
      {
        source: "/explore/:slug",
        destination: "/experiences/:slug",
        permanent: true,
      },
      {
        source: "/explore-talks",
        destination: "/experiences/talks",
        permanent: true,
      },
      {
        source: "/explore-walks",
        destination: "/experiences/walks",
        permanent: true,
      },
      {
        source: "/explore-games",
        destination: "/experiences/games",
        permanent: true,
      },
      {
        source: "/explore-stage-and-screen",
        destination: "/experiences/stories",
        permanent: true,
      },
      {
        source: "/experiences/hands-on",
        destination: "/experiences/workshops",
        permanent: true,
      },
      {
        source: "/experiences/walks-getaways",
        destination: "/experiences/walks",
        permanent: true,
      },
      {
        source: "/experiences/talks-conversations",
        destination: "/experiences/talks",
        permanent: true,
      },
      {
        source: "/experiences/food-senses",
        destination: "/experiences/food",
        permanent: true,
      },
      {
        source: "/experiences/play-movement",
        destination: "/experiences",
        permanent: true,
      },
      {
        source: "/experiences/stage-screen-stories",
        destination: "/experiences/stories",
        permanent: true,
      },
      {
        source: "/for-organisations",
        destination: "/for-organizations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;