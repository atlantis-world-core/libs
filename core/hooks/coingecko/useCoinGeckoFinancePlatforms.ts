import { useState } from "react";
import { CoinGeckoClient, FinancePlatform } from "coingecko-api-v3";

export default function useCoinGeckoFinancePlatforms() {
  const client = new CoinGeckoClient();

  const [data, setData] = useState<FinancePlatform[]>([]);
  const [error, setError] = useState<Error | any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getFinancePlatforms = async () => {
    try {
      setLoading(true);
      const response = await client.financePlatforms();
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [{ data, error, loading }, getFinancePlatforms] as const;
}
