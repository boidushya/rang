import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@/styles/globals.css";

const dm_mono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-mono",
  weight: "500",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rang.boidushya.com"),
  title: "Rang - The Color Accuracy Game!",
  description: "Test your color accuracy with Rang!",
  openGraph: {
    title: "Rang - The Color Accuracy Game!",
    description: "Test your color accuracy with Rang!",
  },
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
      <body className="overflow-hidden">{children}</body>
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string}
      />
    </html>
  );
}
