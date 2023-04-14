import { getAccount, chain } from "@wagmi/core";
import { ethers } from "ethers";
import { getErc1155Contract } from "@aw/lib/core/actions";

const ALPHA_PASS_CONTRACT_ADDRESS =
  "0x18320a508d183a71d5c68bcf7c63c7c7a486f8c5";

interface IIsAlphaPassHolder {
  account?: string | undefined;
}

export const isAlphaPassHolder = async (
  props?: IIsAlphaPassHolder,
): Promise<boolean> => {
  const account = props?.account || getAccount().address;
  if (!account) return false;

  const provider = new ethers.providers.JsonRpcProvider(
    `${chain.optimism.rpcUrls.infura}/${import.meta.env.VITE_INFURA_API_KEY}`,
  );

  const alphaPassContract = getErc1155Contract({
    address: ALPHA_PASS_CONTRACT_ADDRESS,
    signerOrProvider: provider,
  });

  const isAlphaPassHolder =
    (await alphaPassContract.balanceOf(account, 0)).toNumber() > 0;
  return isAlphaPassHolder;
};
