import type { Metadata } from "next";
import "./globals.scss";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
