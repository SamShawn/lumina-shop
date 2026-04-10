import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Lumina - Curated Luxury for the Modern Connoisseur",
  description: "Discover exceptional pieces crafted with precision and purpose. Lumina offers a curated selection of luxury goods for the discerning individual.",
  keywords: ["luxury", "e-commerce", "premium", "design", "artisan"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
