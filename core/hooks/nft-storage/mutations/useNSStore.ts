import { NFTStorage, RequestOptions } from "nft.storage";
import { TokenInput } from "nft.storage/dist/src/token";
import { useMutation, UseMutationOptions } from "react-query";

export interface IUseNSStore extends UseMutationOptions {
  token: TokenInput;
  options?: RequestOptions | undefined;
}

export const useNSStore = (
  instance: NFTStorage,
  { token, options, ...mutationOptions }: IUseNSStore,
) =>
  useMutation(
    ["nft-storage-store", { instance, token, options }],
    async () => instance.store(token, options),
    mutationOptions,
  );
