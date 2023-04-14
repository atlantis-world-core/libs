import { BigNumber } from "ethers";
import { useQuery, UseQueryOptions } from "react-query";
import { useErc20Contract, useLogger } from "lib/core";
import { erc20ABI, useContractEvent } from "wagmi";
import { useState } from "react";

export interface IUseAllowance extends Pick<UseQueryOptions, "enabled"> {
  address?: string | undefined;
  account?: string | undefined;
  spender?: string | undefined;
  refetchInterval?: number | false | undefined;
  chainId?: number | undefined;
}

export const useAllowance = ({
  address,
  account,
  spender,
  enabled,
  refetchInterval,
  chainId,
}: IUseAllowance) => {
  // * log
  const log = useLogger(useAllowance.name);

  // * contract
  const erc20 = useErc20Contract(address);

  // * data
  // const [allowance, setAllowance] = useState<BigNumber | undefined>();

  // * query
  const queryKey = ["erc20-allowance-query", address, account, spender];

  const queryFn = async () => {
    if (!account || !spender) {
      // setAllowance(undefined);
      return 0;
    }
    const _allowance = await erc20.allowance(account, spender);
    // setAllowance(_allowance);
    return _allowance;
  };

  const queryOptions = {
    enabled,
    cacheTime: 0,
    refetchInterval,
    refetchOnWindowFocus: false,
    onSuccess: (data: BigNumber | undefined) => log.success(data),
    onError: (error: unknown) => log.error(error),
  };

  const query = useQuery({
    queryKey,
    queryFn,
    ...queryOptions,
  });

  // * event listener
  // ! lol accidentally subscribed to ALL token apporves from all the users
  // useContractEvent({
  //   address,
  //   chainId,
  //   abi: erc20ABI,
  //   eventName: "Approval",
  //   listener: (_account, _spender, _allowance) => {
  //     log.success("ON_APPROVAL_EVENT", _account, _spender, _allowance);
  //     if (_account === account && _spender === spender) {
  //       setAllowance(_allowance);
  //     }
  //   },
  // });

  return {
    ...query,
    // data: allowance,
  };
};

export const useCheckAllowance = ({
  address,
  account,
  spender,
  enabled,
  refetchInterval,
  chainId,
}: IUseAllowance) =>
  useAllowance({
    address,
    account,
    spender,
    enabled,
    refetchInterval,
    chainId,
  });
