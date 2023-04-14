import { useMemo } from "react";
import { NFTStorage } from "nft.storage";
import { APP_CONFIG } from "config";

export const useNftStorage = (): NFTStorage =>
  useMemo(
    () => new NFTStorage({ token: APP_CONFIG.NFT_STORAGE_API_KEY }),
    [APP_CONFIG.NFT_STORAGE_API_KEY],
  );
