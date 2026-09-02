import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GoToTopButton from "./components/GoToTopButton";
import CookieBanner from "./components/CookieBanner";
import FloatingContactDrawer from "./components/FloatingContactDrawer";
import MetaPixel from "./components/MetaPixel";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kulturekatta.com"),
  title:
    "KultureKatta | Culture-Led Experiences for Organizations & Private Groups",
  description:
    "KultureKatta designs culture-led workshops, city trails, creative sessions, festive experiences, and custom gatherings for organizations, teams, and private groups.",
  applicationName: "KultureKatta",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <body className="kk-site-bg flex min-h-full flex-col">
        <a href="#main-content" className="kk-skip-link">
          Skip to main content
        </a>

        <Navbar />

        <main
          id="main-content"
          tabIndex={-1}
          className="kk-section-light flex-1"
        >
          {children}
        </main>

        <Footer />

        <FloatingContactDrawer />

        <MetaPixel />
        <CookieBanner />

        <GoToTopButton />
      </body>
    </html>
  );
}
