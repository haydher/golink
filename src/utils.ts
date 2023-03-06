import { useState, useEffect } from "react";

export function formatDate(created_at: string): string {
  const date = new Date(created_at);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${("0" + month).slice(-2)}-${("0" + day).slice(-2)}-${year}`;
}

export function useDebounce(callback: any, delay: number) {
  const [timeoutId, setTimeoutId] = useState<any | null>(null);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const debouncedCallback = (...args: string[]) => {
    clearTimeout(timeoutId);
    setTimeoutId(
      setTimeout(() => {
        callback(...args);
      }, delay)
    );
  };

  return debouncedCallback;
}
