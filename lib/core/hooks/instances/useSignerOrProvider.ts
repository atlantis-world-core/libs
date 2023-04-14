import { useMemo } from "react";
import { useProvider, useSigner } from "wagmi";
import { SignerOrProvider } from "lib/core/types";
import { useChainId } from "lib/core";

export const useSignerOrProvider = (chainId?: number): SignerOrProvider => {
  const { data: signer } = useSigner();
  const { data: fallbackChainId } = useChainId();
  const provider = useProvider({ chainId: chainId || fallbackChainId });
  return useMemo<SignerOrProvider>(() => {
    const signerOrProvider = signer || provider;
    return signerOrProvider;
  }, [signer, provider, chainId]);
};
