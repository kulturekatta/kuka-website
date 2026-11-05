import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upcoming Experiences | KultureKatta",
  description: "Discover upcoming KultureKatta workshops, walks and gatherings in Pune.",
  alternates: { canonical: "/experiences/upcoming" },
};

export default function UpcomingExperiencesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
