import { useState } from "react";

/**
 * @deprecated
 * Should never use this anymore.
 */
const useCommonState = <T>() => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  return {
    data,
    error,
    loading,
    setData,
    setError,
    setLoading,
  } as const;
};

export default useCommonState;
