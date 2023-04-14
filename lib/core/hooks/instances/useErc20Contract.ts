import { useMemo } from "react";
import { ERC20__factory } from "types/contracts";
import { useSignerOrProvider } from "lib/core";
import { constants } from "ethers";

export const useErc20Contract = (address?: string) => {
  /**
   * web3
   */
  const signerOrProvider = useSignerOrProvider();

  return useMemo(
    () =>
      ERC20__factory.connect(
        address || constants.AddressZero,
        signerOrProvider,
      ),
    [address, signerOrProvider],
  );
};
