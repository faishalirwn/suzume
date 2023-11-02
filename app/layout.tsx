import type { Metadata } from "next";
import { inter } from "@/app/_ui/fonts";
import "@/app/_ui/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Suzume",
    default: "Suzume",
  },
  description: "japanese song lyrics or something",
  metadataBase: new URL("https://suzume.vercel.app/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
