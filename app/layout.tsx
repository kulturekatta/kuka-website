import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "KultureKatta",
  description: "Culture is what we do.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
<body className="min-h-full flex flex-col bg-[#FAFAF7] text-[#171717]">        {/* 🔝 NAVBAR */}
        <header className="w-full border-b border-gray-200">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

            {/* 🟡 LOGO */}
            <Link href="/" className="flex items-center">
                <Image
                 src="/logo.png"
                  alt="KultureKatta"
                  width={140}
                  height={40}
                  className="h-40 w-40"
              />
            </Link>

            {/* 🔗 NAV LINKS + CTA */}
            <nav className="flex items-center gap-5 text-lg font-medium text-gray-800">
              <Link href="/" className="hover:text-black">Home</Link>
              <Link href="/about" className="hover:text-black">About</Link>
              <Link href="/experiences" className="hover:text-black">Experiences</Link>
              <Link href="/for-organisations" className="hover:text-black">For Organisations</Link>
              <Link href="/stories" className="hover:text-black">Stories</Link>
              <Link href="/work-with-us" className="hover:text-black">Work With Us</Link>
              <Link href="/contact" className="hover:text-black">Contact</Link>

              {/* 🚀 CTA BUTTON */}
              <Link
                href="/experiences"
                className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800"
              >
                Explore
              </Link>
            </nav>
          </div>
        </header>

        {/* 📄 PAGE CONTENT */}
        <main className="flex-1">
          {children}
        </main>

      </body>
    </html>
  );
}