type Exchange = {
  address: string
  color?: string
  exchangeVersion?: string
  iconUrl?: string
  id: string
  name?: string
  networkId: number
  tradeUrl?: string
}

enum QuoteToken {
  Token0 = 'token0',
  Token1 = 'token1',
}

type TokenWithMetaData = {
  __typename?: 'TokenWithMetadata';
  address: string;
  createdAt?: number | null;
  decimals?: number | null;
  exchanges: Exchange[];
  id: string;
  imageLargeUrl?: string | null;
  imageSmallUrl?: string | null;
  imageThumbUrl?: string | null;
  isScam?: boolean | null;
  lastTransaction?: number | null;
  liquidity: string;
  marketCap?: string | null;
  name: string;
  networkId: number;
  price: number;
  priceChange: number;
  priceChange1: number;
  priceChange4: number;
  priceChange12: number;
  priceChange24: number;
  quoteToken?: QuoteToken | null;
  resolution: string;
  symbol: string;
  topPairId: string;
  txnCount1?: number | null;
  txnCount4?: number | null;
  txnCount12?: number | null;
  txnCount24?: number | null;
  uniqueBuys1?: number | null;
  uniqueBuys4?: number | null;
  uniqueBuys12?: number | null;
  uniqueBuys24?: number | null;
  uniqueSells1?: number | null;
  uniqueSells4?: number | null;
  uniqueSells12?: number | null;
  uniqueSells24?: number | null;
  volume: string;
};

export type { TokenWithMetaData }
