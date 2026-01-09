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
  return (
    <html lang="en">
      <head>
        <Script
          src="https://static.memberstack.com/scripts/v2/memberstack.js"
          strategy="beforeInteractive"
          data-memberstack-app={process.env.NEXT_PUBLIC_MEMBERSTACK_APP}
          data-memberstack-domain={process.env.NEXT_PUBLIC_MEMBERSTACK_DOMAIN}
          data-memberstack-public-key={process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
