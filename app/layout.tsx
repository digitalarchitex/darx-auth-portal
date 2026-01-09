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
          data-memberstack-app="app_cmg8prwjm003p0sr1dglq1u4m"
          data-memberstack-domain="https://memberstack-client.digitalarchitex.com"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
