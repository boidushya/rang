import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "@/styles/globals.css";

const dm_mono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: "500",
});

export const metadata: Metadata = {
  title: "Color Match",
  description: "Match some colors!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dm_mono.variable}`}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
