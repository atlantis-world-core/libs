import { useQuery, UseQueryOptions } from "react-query";
import { ERC20__factory } from "types/contracts";
import { useLogger } from "lib/core/hooks";
import { BigNumber, utils } from "ethers";
import { useAccount, useNetwork, useProvider } from "wagmi";

export interface TokenWithBalance {
  address: string;
  decimals: number;
  formatted: string;
  symbol?: string;
  value: BigNumber;
}

export interface UseTokenBalancesOptions
  extends Pick<UseQueryOptions, "enabled"> {
  addresses: string[];
  account?: string | undefined;
  fetchSymbol?: boolean | undefined;
}

export type TokenBalancesQueryResult = TokenWithBalance[];

export const useTokenBalances = ({
  addresses: tokenAddresses,
  account: accountAddress,
  fetchSymbol,
  enabled,
}: UseTokenBalancesOptions) => {
  const log = useLogger(useTokenBalances.name);

  /**
   * wagmi
   */
  const { address: defaultAccountAddress } = useAccount();
  const { chain } = useNetwork();
  const provider = useProvider({ chainId: chain?.id });

  /**
   * query
   */
  const queryKey = [
    "get-tokens-balances",
    tokenAddresses,
    accountAddress,
    chain?.id,
  ];

  const queryFn = async (): Promise<TokenBalancesQueryResult> => {
    const address = accountAddress ?? defaultAccountAddress;
    if (!address) {
      return [];
    }

    const balances = await Promise.all(
      tokenAddresses.map(async (tokenAddress) => {
        const erc20 = ERC20__factory.connect(tokenAddress, provider);

        const decimals = await erc20.decimals();
        const symbol = fetchSymbol ? await erc20.symbol() : undefined;
        const balance = await erc20.balanceOf(address);
        const formatted = utils.formatUnits(balance, decimals);

        // const balance = await fetchBalance({
        //   addressOrName: address,
        //   chainId: chain?.id,
        //   token:
        //     tokenAddress === ETH_ADDRESS ||
        //     tokenAddress === constants.AddressZero
        //       ? undefined
        //       : tokenAddress,
        //   formatUnits: decimals,
        // });

        const tokenWithBalance: TokenWithBalance = {
          address: tokenAddress,
          symbol,
          decimals,
          value: balance,
          formatted,
        };
        return tokenWithBalance;
      }),
    );

    return balances;
  };

  const queryOptions = {
    enabled,
    cacheTime: 0,
    retry: false,
    onSuccess: (data: TokenBalancesQueryResult) => log.success(data),
    onError: (error: unknown) => log.error(error),
  };

  return useQuery({
    queryKey,
    queryFn,
    ...queryOptions,
  });
};
