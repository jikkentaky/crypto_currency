import type { Metadata } from "next";
import { Lato } from 'next/font/google'
import "./globals.scss";

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '900', '700'],
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
    <html lang="en" className={lato.className}>
      <body
        className={''}
      >
        {children}
      </body>
    </html>
  );
}
