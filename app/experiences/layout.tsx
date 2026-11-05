import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Experiences | KultureKatta",
  description: "Discover creative, cultural and participatory KultureKatta experiences.",
  alternates: { canonical: "/experiences" },
};

export default function ExperiencesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
