import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/core/Header";
import { Footer } from "@/components/core/Footer";

export const metadata: Metadata = {
  title: "Memories",
  description: "Memories - Real Estate Platform",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
