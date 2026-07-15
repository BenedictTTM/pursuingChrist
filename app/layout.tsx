import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat, Oswald, Raleway, Poppins, IM_Fell_English, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Providers from "./providers";
import AmbientBackground from "@/components/AmbientBackground";
import { Toaster } from "@/components/ui/sonner";
import SchemaMarkup from "@/components/SchemaMarkup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: 'swap',
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: 'swap',
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-stallman",
  weight: ["700"],
  display: 'swap',
});

const imFellEnglish = IM_Fell_English({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-im-fell",
  display: 'swap',
});

const brotheric = localFont({
  src: "../public/font/brotheric.regular.otf",
  variable: "--font-brotheric",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pursuingchrist.space'),
  title: {
    default: "Pursuing Christ | Transforming the Total Man",
    template: "%s | Pursuing Christ"
  },
  description: "An online Christian ministry dedicated to faith, purpose, and discipleship. Transforming the Total Man with the Total Word of God.",
  keywords: ["Christian ministry", "Bible study", "Discipleship", "Faith", "Jesus Christ", "Online Church"],
  authors: [{ name: "Pursuing Christ" }],
  openGraph: {
    title: "Pursuing Christ Ministry",
    description: "Transforming the Total Man with the Total Word of God.",
    url: "https://www.pursuingchrist.space",
    siteName: "Pursuing Christ",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pursuing Christ Ministry",
    description: "Transforming the Total Man with the Total Word of God.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${montserrat.variable} ${oswald.variable} ${raleway.variable} ${imFellEnglish.variable} ${brotheric.variable} ${cormorant.variable} font-sans antialiased text-[var(--color-mba-text-primary)] overflow-x-hidden`}
      >
        <SchemaMarkup />
        <AmbientBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          <TopBar />
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </div>
      </body>
    </html>
  );
}
