import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I'm In A Pickle",
  description:
    "A pickleball bonding party game — lose a set, answer a vulnerable, funny, or spicy question about being in a pickle.",
};

export default function PickleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
