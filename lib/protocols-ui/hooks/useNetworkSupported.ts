import { useEffect, useMemo, useState } from "react";
import { useNetwork } from "wagmi";
import { useLogger } from "../../core";

export default function useNetworkSupported(supportedChains?: string[]) {
  const log = useLogger(useNetworkSupported.name);
  const chains = Object.keys(supportedChains || []);
  const { chain } = useNetwork();
  const [chainId, setChainId] = useState<number | undefined>(chain?.id);
  const networkNameOrId = useMemo<string>(
    () => chain?.name || String(chainId) || "Unknown Network",
    [chain],
  );
  const isNetworkSupported = useMemo(
    () =>
      chains.includes(String(chainId)) || chains.indexOf(String(chainId)) >= 0,
    [chainId],
  );
  // # eslint-disable-next-line

  useEffect(() => {
    window?.ethereum?.on &&
      window?.ethereum?.on("networkChanged", (networkId: any) => {
        setChainId(networkId);
      });
  }, []);

  useEffect(() => {
    log.verbose("#0 useEffect [network]", chain);
  }, [chain]);

  return useMemo(
    () =>
      ({
        chainId,
        networkNameOrId,
        // isNetworkSupported,
        isNetworkSupported: true, // ! TODO(@carlomigueldy): This must be fixed later
      } as const),
    [chain, chainId, networkNameOrId, isNetworkSupported],
  );
}
