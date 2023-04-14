import { UseQueryOptions } from "react-query";

export type NftStorageUseQueryHookOptions = Pick<
  UseQueryOptions,
  "onSettled" | "onSuccess" | "onError"
>;
