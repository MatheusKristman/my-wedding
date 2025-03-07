import type { Metadata } from "next";
import { Rouge_Script, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import "./globals.css";

import TRPCProvider from "@/providers/trpc-provider";

const rougeScript = Rouge_Script({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-rouge-script",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

const fonde = localFont({
  src: "../fonts/fonde.woff",
  display: "swap",
  variable: "--font-fonde",
});

export const metadata: Metadata = {
  title: "Casamento M&G",
  description: "Site do nosso casamento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fonde.variable} ${montserrat.variable} ${rougeScript.variable}`}>
      <body className="antialiased">
        <TRPCProvider>
          <NuqsAdapter>
            <Toaster richColors />
            {children}
          </NuqsAdapter>
        </TRPCProvider>
      </body>
    </html>
  );
}
