import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import GoToTopButton from "./components/GoToTopButton";
import Footer from "./components/Footer";
import CookieBanner from "./components/CookieBanner";
import FloatingSocialBar from "./components/FloatingSocialBar";
import FloatingContactDrawer from "./components/FloatingContactDrawer";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "KultureKatta | Culture-Led Experiences for Organizations & Private Groups",
  description:
    "KultureKatta designs culture-led workshops, city trails, creative sessions, festive experiences, and custom gatherings for organizations, teams, and private groups.",
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
        <Navbar />

        <main className="kk-section-light flex-1">{children}</main>

        <Footer />

        {/* GLOBAL FLOATING CONTACT ELEMENTS */}
        <FloatingSocialBar />
        <FloatingContactDrawer />

        <GoToTopButton />

        <CookieBanner />
      </body>
    </html>
  );
}