import { useEffect, useState } from "react";

// Reference
// https://usehooks-ts.com/react-hook/use-debounce
export const useDebounce = <T>(
  value: T,
  delay?: number,
): { debouncedValue: T } => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return { debouncedValue } as const;
};
