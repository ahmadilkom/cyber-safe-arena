import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberSafe | Literasi Digital",
  description: "Game edukasi literasi digital interaktif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
