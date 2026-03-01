import { useState, useEffect, useRef } from "react";

/**
 * Generic hook for fetching data from Supabase.
 *
 * - Starts with `null` while loading (or an optional `initialValue`).
 * - Once Supabase responds, swaps in the live data.
 * - Exposes `loading` and `error` states for UI handling.
 */
export function useQuery<T>(
  queryFn: () => Promise<T>,
  initialValue?: T
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(initialValue ?? null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    queryFn()
      .then((result) => setData(result))
      .catch((err) => {
        console.error("[useQuery] Supabase fetch failed:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
