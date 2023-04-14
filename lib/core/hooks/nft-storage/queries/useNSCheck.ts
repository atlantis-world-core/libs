import { NftStorageUseQueryHookOptions } from "lib/core/types/nft-storage";
import { NFTStorage, RequestOptions } from "nft.storage";
import { useQuery } from "react-query";

export interface IUseNSCheck extends NftStorageUseQueryHookOptions {
  cid: string;
  options?: RequestOptions | undefined;
}

export const useNSCheck = (
  instance: NFTStorage,
  { cid, options, ...queryOptions }: IUseNSCheck,
) =>
  useQuery(["nft-storage-check"], async () => instance.check(cid, options), {
    cacheTime: 0,
    onSettled: queryOptions.onSettled,
    onSuccess: queryOptions.onSuccess,
    onError: queryOptions.onError,
  });
