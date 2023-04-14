import axios from "axios";
import { useQuery } from "react-query";
import { useLogger } from "lib/core/hooks";

const COINGECKO_API_ETH_PRICE_URI =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

interface CoingeckoApiEthPriceQueryResponse {
  [network: string]:
    | {
        usd: number;
      }
    | undefined;
}

export type EthPriceUsdQueryResponse = number | undefined;

export const useEthPriceUsd = () => {
  const log = useLogger(useEthPriceUsd.name);
  return useQuery(
    ["fetch-eth-price-usd"],
    async (): Promise<EthPriceUsdQueryResponse> => {
      const { data: fetchEthPriceResultData } =
        await axios.get<CoingeckoApiEthPriceQueryResponse>(
          COINGECKO_API_ETH_PRICE_URI,
        );
      const ethPriceUsd = fetchEthPriceResultData.ethereum?.usd;
      log.verbose("FETCH_ETH_PRICE_USD", ethPriceUsd);
      return ethPriceUsd;
    },
    {
      onError: (error) => log.error("FETCH_ETH_PRICE_USD_ERROR", error),
      refetchOnWindowFocus: false,
    },
  );
};
