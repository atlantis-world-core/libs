import { useLogger } from "lib/core";
import { useMutation } from "react-query";

interface IToken {
  address: string;
  symbol: string;
  decimals: number;
  image?: string;
}

export const useAddToken = () => {
  const log = useLogger(useAddToken.name);
  return useMutation(async (token: IToken) => {
    const response = window.ethereum?.request({
      // @ts-ignore
      method: "wallet_watchAsset",
      params: {
        // @ts-ignore
        type: "ERC20",
        options: token,
      },
    });
    log.verbose("ADD_TOKEN_RESPONSE", response);
    return response;
  });
};
