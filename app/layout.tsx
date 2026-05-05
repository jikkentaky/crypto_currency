import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.scss";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const description =
  "ONCHAINBUBBLES is an innovative tool that visualizes real-time price changes of cryptocurrencies across various networks such as Ethereum, Solana, Base, Tron, Binance Smart Chain, Optimism, Blast, Avalanche, Fantom, Polygon, Sei, Metis, and more. Each bubble dynamically changes in size and color to reflect current price movements, providing users with a quick and intuitive way to assess market trends and volatility.";

export const metadata: Metadata = {
  title: "ONCHAINBUBBLES",
  description,
  openGraph: {
    title: "ONCHAINBUBBLES",
    description,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ONCHAINBUBBLES",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.className}>{children}</body>
    </html>
  );
}
