import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "../style/globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import Header from "@/components/header";
import Footer from "@/components/footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Allodermis | Board-Certified Dermatology & Clinical Skincare",
    template: "%s | Allodermis Dermatology",
  },
  description:
    "Allodermis provides physician-led dermatology treatments, US-FDA approved technologies, AI skin analysis, and genuine clinical skincare formulations curated by board-certified dermatologists.",
  keywords: [
    "Allodermis",
    "dermatologist Bhubaneswar",
    "clinical skincare",
    "skin clinic",
    "acne scar treatment",
    "laser hair reduction",
    "chemical peels",
    "Dr Alok Kumar Sahoo",
    "dermatology online consultation",
    "authentic medical skincare products",
  ],
  authors: [{ name: "Allodermis Medical Team" }],
  creator: "Allodermis Dermatology Clinic",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://allodermis.com",
    siteName: "Allodermis Dermatology",
    title: "Allodermis | Board-Certified Dermatology & Clinical Skincare",
    description:
      "Transform your skin with physician-formulated medical solutions, advanced laser aesthetics, and board-certified dermatologists.",
    images: [
      {
        url: "https://allodermis.com/cdn/shop/files/Allodermis_Transparent_bg_1.png?v=1750877830&width=1200",
        width: 1200,
        height: 630,
        alt: "Allodermis Dermatology",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-charcoal font-sans antialiased selection:bg-[#EAE1D7] selection:text-charcoal">
        <CartProvider>
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
