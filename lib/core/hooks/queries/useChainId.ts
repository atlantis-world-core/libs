import { useQuery } from "react-query";
import { useNetwork, useSwitchNetwork } from "wagmi";

export interface IUseChainId {
  defaultChainId?: number | undefined;
}

export const useChainId = (options?: IUseChainId) => {
  const { defaultChainId } = options || { defaultChainId: 1 };
  const { chain } = useNetwork();
  const { pendingChainId } = useSwitchNetwork();
  return useQuery(
    ["get-chain-id", defaultChainId, pendingChainId, chain],
    async () => {
      let chainId: number | string | undefined = Number(
        await window.ethereum?.request({
          method: "eth_chainId",
        }),
      );
      chainId = !Number.isNaN(chainId)
        ? chainId
        : chain?.id || pendingChainId || defaultChainId;
      return chainId;
    },
    {
      cacheTime: 0,
    },
  );
};
