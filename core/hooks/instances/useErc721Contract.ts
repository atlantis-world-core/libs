import { useSignerOrProvider } from "lib/core/hooks/instances/useSignerOrProvider";
import { useMemo } from "react";
import { ERC721__factory } from "types/contracts";

export const useErc721Contract = (address: string) => {
  const signerOrProvider = useSignerOrProvider();
  return useMemo(
    () => ERC721__factory.connect(address, signerOrProvider),
    [address, signerOrProvider],
  );
};
