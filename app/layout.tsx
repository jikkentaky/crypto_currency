import type { Metadata } from "next";
import { Press_Start_2P } from 'next/font/google'
import "./globals.scss";

const start2p = Press_Start_2P({
  subsets: ['latin'],
  display: 'auto',
  weight: ['400'],
  preload: true,
});

export const metadata: Metadata = {
  title: "ONCHAINBUBBLES",
  description: "ONCHAINBUBBLES is an innovative tool that visualizes real-time price changes of cryptocurrencies across various networks such as Ethereum, Solana, Base, Tron, Binance Smart Chain, Optimism, Blast, Avalanche, Fantom, Polygon, Sei, Metis, and more. Each bubble dynamically changes in size and color to reflect current price movements, providing users with a quick and intuitive way to assess market trends and volatility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={start2p.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
