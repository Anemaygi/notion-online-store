import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/Carrinho";
import { NavigationTopMenu } from "@/components/NavigationTopMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notion-powered Online Store",
  description: "Demo of a Notion-powered Online Store made using NextJS :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="sticky z-40 bg-white p-4 shadow-md top-0 w-full flex justify-center">
            <NavigationTopMenu />
          </header>
          <main className="z-0">
          {children}
          </main>
        </body>
      </html>
    </CartProvider>
  );
}
