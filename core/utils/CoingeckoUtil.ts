import { CHAIN_IDS } from "@aw/lib/core/constants";
import axios from "axios";
import { constants, utils } from "ethers";

interface CoingeckoApiTokenPriceResponse {
  [addressOrNetwork: string]:
    | {
        usd: number;
      }
    | undefined;
}

interface ICoingeckoUtilGetTokensPriceUsd {
  tokens: string[];
  chainId?: number | undefined;
}

export interface GetTokensPriceUsdResponse {
  [address: string]: number | undefined;
}

export class CoingeckoUtil {
  public static CHAIN_IDS: { [chainId: number]: string } = {
    [CHAIN_IDS.MAINNET]: "ethereum",
    [CHAIN_IDS.POLYGON]: "polygon-pos",
    [CHAIN_IDS.CELO]: "celo",
    [CHAIN_IDS.FANTOM_OPERA]: "fantom",
    [CHAIN_IDS.BINANCE]: "binance-smart-chain",
    [CHAIN_IDS.ARBITRUM]: "arbitrum-one",
    [CHAIN_IDS.AVALANCHE]: "avalanche",
    [CHAIN_IDS.AURORA]: "aurora",
    [CHAIN_IDS.OPTIMISM]: "optimistic-ethereum",
  };

  public static API_URLS = {
    TOKEN_PRICE: "https://api.coingecko.com/api/v3/simple/token_price",
    ETH_PRICE_USD:
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
  };

  public static GetTokensPriceUsd = async ({
    tokens,
    chainId,
  }: ICoingeckoUtilGetTokensPriceUsd) => {
    // eth
    const { data: fetchEthPriceResultData } =
      await axios.get<CoingeckoApiTokenPriceResponse>(
        this.API_URLS.ETH_PRICE_USD,
      );
    const ethPriceUsd = fetchEthPriceResultData.ethereum?.usd;

    // erc20
    const coingeckoChainId = this.CHAIN_IDS[chainId ?? CHAIN_IDS.MAINNET];
    const { data: fetchTokensPriceResultData } =
      await axios.get<CoingeckoApiTokenPriceResponse>(
        `${this.API_URLS.TOKEN_PRICE}/${coingeckoChainId}`,
        {
          params: {
            contract_addresses: tokens.join(),
            vs_currencies: "usd",
          },
        },
      );

    const tokenAddressToPriceUsd: GetTokensPriceUsdResponse = {};
    tokens.map(
      (tokenAddress) =>
        (tokenAddressToPriceUsd[tokenAddress] =
          tokenAddress === constants.AddressZero
            ? ethPriceUsd
            : fetchTokensPriceResultData[utils.getAddress(tokenAddress)]?.usd ??
              fetchTokensPriceResultData[tokenAddress.toLowerCase()]?.usd),
    );

    return tokenAddressToPriceUsd;
  };

  public static GetEthPriceUsd = async () => {
    const { data: fetchEthPriceResultData } =
      await axios.get<CoingeckoApiTokenPriceResponse>(
        this.API_URLS.ETH_PRICE_USD,
      );
    const ethPriceUsd = fetchEthPriceResultData.ethereum?.usd;
    return ethPriceUsd;
  };
}
