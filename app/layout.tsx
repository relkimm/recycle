import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "분리수거 매칭",
  description: "동네 기반 분리수거 매칭 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div id="mobile-frame">
            <main className="min-h-screen">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
