import { constants, utils } from "ethers";
import { useMemo } from "react";
import { CHAINS } from "lib/core/constants";
import { useChainId } from "lib/core/hooks";

export interface IUseTokenLogo {
  address?: string | undefined;
}

export const useTokenLogo = ({ address }: IUseTokenLogo) => {
  const { data: chainId } = useChainId();
  return useMemo(
    () =>
      `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${CHAINS[
        chainId || 1
      ].name.toLowerCase()}/assets/${utils.getAddress(
        address || constants.AddressZero,
      )}/logo.png`,
    [address, chainId],
  );
};
