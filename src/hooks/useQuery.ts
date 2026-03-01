import { useState, useEffect, useRef } from "react";

/**
 * Generic hook for fetching data from Supabase.
 *
 * - Renders immediately with `defaultValue` (no loading spinner).
 * - Once Supabase responds, swaps in the live data.
 * - If the query fails, keeps the default — site never breaks.
 */
export function useQuery<T>(
  queryFn: () => Promise<T>,
  defaultValue: T
): { data: T; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    queryFn()
      .then((result) => setData(result))
      .catch((err) => {
        console.error("[useQuery] Supabase fetch failed, using defaults:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
