import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "DARX Auth Portal",
  description: "Sign in to your DARX account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const memberstackKey = process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY;

  return (
    <html lang="en">
      <head>
        <Script
          src="https://static.memberstack.com/scripts/v1/memberstack.js"
          strategy="beforeInteractive"
          data-memberstack-id={memberstackKey}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
