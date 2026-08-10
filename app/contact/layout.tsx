import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact KultureKatta",
  description:
    "Contact KultureKatta about cultural experiences, organizational programs, partnerships, hosting, volunteering, and media enquiries.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
