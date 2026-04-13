import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/components/design-system/tokens.css";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Lightbox } from "@/components/ui/Lightbox";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Lumina — Handcrafted Objects Made with Intention",
  description: "Discover small-batch goods made by hand, built to last. Each piece in our collection represents the pinnacle of craft and intentional design.",
  keywords: ["luxury", "e-commerce", "premium", "design", "artisan"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lumina.shop'),
  openGraph: {
    type: "website",
    siteName: "Lumina",
    title: "Lumina - Curated Luxury for the Modern Connoisseur",
    description: "Discover exceptional pieces crafted with precision and purpose. Lumina offers a curated selection of luxury goods for the discerning individual.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lumina - Curated Luxury",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina - Curated Luxury for the Modern Connoisseur",
    description: "Discover exceptional pieces crafted with precision and purpose.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=JSON.parse(localStorage.getItem('lumina-ui')||'{}');var theme=t.theme||'system';var isDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=theme==='dark'?'dark':theme==='light'?'light':isDark?'dark':'light';document.documentElement.setAttribute('data-theme',resolved);}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Providers>
          <Header />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </Providers>
        <CartDrawer />
        <Lightbox />
      </body>
    </html>
  );
}
