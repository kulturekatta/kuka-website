import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
