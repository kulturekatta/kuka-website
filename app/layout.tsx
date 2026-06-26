import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import GoToTopButton from "./components/GoToTopButton";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KultureKatta | Culture-Led Experiences for Teams & Private Groups",
  description:
    "KultureKatta designs culture-led workshops, city trails, creative sessions, festive experiences, and custom gatherings for teams and private groups.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="kk-site-bg min-h-full flex flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />

        <GoToTopButton />
      </body>
    </html>
  );
}