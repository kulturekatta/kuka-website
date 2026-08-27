import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Culture-Led Experiences | KultureKatta",
  description:
    "Explore KultureKatta workshops, walks, food, music, stories, games, movement, wellness, festive programs, and custom combinations.",
  alternates: {
    canonical: "/experiences",
  },
};

export default function ExperiencesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
