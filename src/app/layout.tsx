import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "뉴스스탠드",
  description: "언론사를 탐색하고 구독하는 데스크톱 뉴스스탠드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
