import { useState } from "react";
import { useHttpClient } from "..";

export interface AssetPlatform {
  id: string;
  chain_identifier: string | null;
  name: string;
  shortname: string;
}

export default function useCoinGeckoAssetPlatforms() {
  const { coingecko } = useHttpClient();
  const [data, setData] = useState<AssetPlatform[]>([]);
  const [error, setError] = useState<Error | any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getAssetPlatforms = async () => {
    try {
      setLoading(true);
      const response = await coingecko.get("/asset_platforms");
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [{ data, error, loading }, getAssetPlatforms] as const;
}
