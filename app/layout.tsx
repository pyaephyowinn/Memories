import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/core/Header";
import { Footer } from "@/components/core/Footer";
import { Toaster } from "@/components/ui/toaster";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: "Memories",
  description: "Memories - Real Estate Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NuqsAdapter>
          <div className="flex flex-col min-h-screen">
            <Header />
            {children}
            <Footer />
          </div>
          <Toaster />
        </NuqsAdapter>
      </body>
    </html>
  );
}
