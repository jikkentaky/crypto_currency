export type TokenFilterResult = {
  __typename?: 'TokenFilterResult';
  age?: number;
  buyCount1?: number;
  buyCount4?: number;
  buyCount12?: number;
  buyCount24?: number;
  change1: number;
  change4: number;
  change12: number;
  change24: number;
  createdAt?: number;
  exchanges?: Exchange[];
  fdv?: string;
  high1?: string;
  high4?: string;
  high12?: string;
  high24?: string;
  holders?: number;
  isScam?: boolean;
  lastTransaction?: number;
  liquidity?: string;
  low1?: string;
  low4?: string;
  low12?: string;
  low24?: string;
  marketCap: number;
  pair?: Pair;
  priceUSD: number;
  quoteToken?: string;
  sellCount1?: number;
  sellCount4?: number;
  sellCount12?: number;
  sellCount24?: number;
  token: EnhancedToken;
  txnCount1?: number;
  txnCount4?: number;
  txnCount12?: number;
  txnCount24?: number;
  uniqueBuys1?: number;
  uniqueBuys4?: number;
  uniqueBuys12?: number;
  uniqueBuys24?: number;
  uniqueSells1?: number;
  uniqueSells4?: number;
  uniqueSells12?: number;
  uniqueSells24?: number;
  uniqueTransactions1?: number;
  uniqueTransactions4?: number;
  uniqueTransactions12?: number;
  uniqueTransactions24?: number;
  volume1?: string;
  volume4?: string;
  volume12?: string;
  volume24: number;
};

export type EnhancedToken = {
  __typename?: 'EnhancedToken';
  address: string;
  circulatingSupply?: string;
  cmcId?: number;
  createBlockNumber?: number;
  createTransactionHash?: string;
  createdAt?: number;
  creatorAddress?: string;
  decimals: number;
  exchanges?: Exchange[];
  explorerData?: ExplorerTokenData;
  id: string;
  imageLargeUrl?: string;
  imageSmallUrl?: string;
  imageThumbUrl?: string;
  info: TokenInfo;
  isScam?: boolean;
  name: string;
  networkId: number;
  pooled?: string;
  socialLinks?: SocialLinks;
  symbol: string;
  totalSupply?: string;
};

export type Exchange = {
  __typename?: 'Exchange';
  address: string;
  color?: string;
  exchangeVersion?: string;
  iconUrl?: string;
  id: string;
  name?: string;
  networkId: number;
  tradeUrl?: string;
};

export type Pair = {
  __typename?: 'Pair';
  address: string;
  createdAt?: number;
  exchangeHash: string;
  fee?: number;
  id: string;
  networkId: number;
  pooled?: PooledTokenValues;
  tickSpacing?: number;
  token0: string;
  token0Data?: EnhancedToken;
  token1: string;
  token1Data?: EnhancedToken;
};

export type ExplorerTokenData = {
  __typename?: 'ExplorerTokenData';
  blueCheckmark?: boolean;
  description?: string;
  divisor?: string;
  id: string;
  tokenPriceUSD?: string;
  tokenType?: string;
};

export type TokenInfo = {
  __typename?: 'TokenInfo';
  address: string;
  circulatingSupply?: string;
  cmcId?: number;
  description?: string;
  id: string;
  imageLargeUrl?: string;
  imageSmallUrl?: string;
  imageThumbUrl?: string;
  isScam?: boolean;
  name: string;
  networkId: number;
  symbol: string;
  totalSupply?: string;
};

export type SocialLinks = {
  __typename?: 'SocialLinks';
  bitcointalk?: string;
  blog?: string;
  coingecko?: string;
  coinmarketcap?: string;
  discord?: string;
  email?: string;
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  reddit?: string;
  slack?: string;
  telegram?: string;
  twitch?: string;
  twitter?: string;
  website?: string;
  wechat?: string;
  whitepaper?: string;
  youtube?: string;
};

export type PooledTokenValues = {
  __typename?: 'PooledTokenValues';
  token0?: string;
  token1?: string;
};
export type { TokenFilterResult as TokenFilterResultType }
