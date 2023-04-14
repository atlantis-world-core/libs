import { useMemo } from "react";
import { useCoreContext } from "lib/core";
import { globalAuthState } from "state";
import axios from "axios";

// TODO: Refactor and use React Context API approach
export const useHttpClient = () => {
  const {
    accessToken,
    alchemyApiPolygonMainnetUrl,
    apiBaseUrl,
    moralisWeb3ApiKey,
  } = useCoreContext();
  return useMemo(
    () =>
      ({
        api: axios.create({
          baseURL: globalAuthState.get().apiBaseUrl,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),

        moralis: axios.create({
          baseURL: "https://deep-index.moralis.io/api/v2",
          headers: {
            "X-API-Key": moralisWeb3ApiKey,
          },
        }),

        alchemy: axios.create({
          baseURL: alchemyApiPolygonMainnetUrl,
        }),

        coingecko: axios.create({
          baseURL: "https://api.coingecko.com/api/v3",
        }),
      } as const),
    [accessToken],
  );
};
