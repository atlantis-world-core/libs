import { useQuery, UseQueryOptions } from "react-query";
import { useLogger } from "lib/core/hooks";
import { CoingeckoUtil } from "@aw/lib/core/utils";
import { useNetwork } from "wagmi";

interface IUseTokensPriceUsd extends Pick<UseQueryOptions, "enabled"> {
  addresses: string[];
  chainId?: number;
}

export const useTokensPriceUsd = ({
  addresses,
  enabled,
  chainId: chainId_,
}: IUseTokensPriceUsd) => {
  /**
   * utils
   */
  const log = useLogger(useTokensPriceUsd.name);

  /**
   * web3
   */
  const { chain } = useNetwork();
  const chainId = chainId_ ?? chain?.id;

  /**
   * query
   */
  const query = useQuery(
    ["fetch-tokens-price-usd", addresses, chainId],
    () =>
      CoingeckoUtil.GetTokensPriceUsd({
        tokens: addresses,
        chainId,
      }),
    {
      enabled,
      refetchOnWindowFocus: false,
      onError: (error) => log.error("FETCH_TOKENS_PRICE_USD_ERROR", error),
    },
  );
  return query;
};
