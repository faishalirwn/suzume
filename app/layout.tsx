import type { Metadata } from "next";
import { inter } from "@/app/_ui/fonts";
import "@/app/_ui/globals.css";
import Image from "next/image";
import Link from "next/link";

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
      <body className={`${inter.className} antialiased`}>
        <nav>
          <Image
            src="/papurika-black.svg"
            width={50}
            height={50}
            alt="Suzume logo"
          />
          <input
            type="text"
            name="song"
            id="song"
            placeholder="Search for artist or song title"
          />
          <Link href="/sign-in">Sign in</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
