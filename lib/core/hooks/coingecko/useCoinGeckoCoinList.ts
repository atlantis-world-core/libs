import { useState } from "react";
import { CoinGeckoClient, CoinListResponseItem } from "coingecko-api-v3";

export default function useCoinGeckoCoinList() {
  const client = new CoinGeckoClient();

  const [data, setData] = useState<CoinListResponseItem[]>([]);
  const [error, setError] = useState<Error | any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const getCoinList = async () => {
    try {
      setLoading(true);
      const response = await client.coinList({
        include_platform: true,
      });
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [{ data, error, loading }, getCoinList] as const;
}
