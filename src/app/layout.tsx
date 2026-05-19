import type { Metadata } from "next";
import { Syne, Albert_Sans, Playfair_Display, Telex, Sofia_Sans, Inter, Fragment_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { LenisProvider } from "@/components/lenis-provider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const telex = Telex({
  variable: "--font-telex",
  subsets: ["latin"],
  weight: "400",
});

const sofiaSans = Sofia_Sans({
  variable: "--font-sofia-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Recordly-style: Inter for body/headings, Fragment Mono for small mono accents.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "avora",
  description:
    "Avora uses AI to generate, optimise, and distribute your paid ad campaigns automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${albertSans.variable} ${playfair.variable} ${telex.variable} ${sofiaSans.variable} ${inter.variable} ${fragmentMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{localStorage.removeItem('avora-theme')}catch(e){};document.documentElement.classList.add('dark');if('scrollRestoration'in history){history.scrollRestoration='manual'}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
