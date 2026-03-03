// ============================================================================
// VWFS Performance Platform - Mock API Hook
// ============================================================================

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Simulates an asynchronous API call with loading state and error handling.
 * Uses a random delay between 200-500ms to mimic network latency.
 *
 * @param fetcher - A function that returns the mock data synchronously.
 * @param deps - Dependency array to trigger re-fetching when values change.
 * @returns An object with data, loading, error, and refetch properties.
 */
export function useMockAPI<T>(
  fetcher: () => T,
  deps: unknown[] = []
): {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    const delay = 200 + Math.random() * 300;

    const timer = setTimeout(() => {
      if (!mountedRef.current) return;

      try {
        const result = fetcher();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        setLoading(false);
      }
    }, delay);

    return timer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    mountedRef.current = true;
    const timer = fetchData();

    return () => {
      mountedRef.current = false;
      clearTimeout(timer);
    };
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}
