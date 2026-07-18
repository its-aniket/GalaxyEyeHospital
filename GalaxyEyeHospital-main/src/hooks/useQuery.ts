import { useState, useEffect, useRef } from "react";

/* ─── Shared in-memory cache ───
   Keyed by query function reference so identical calls across
   multiple components share one network request.              */
const cache = new Map<Function, { promise: Promise<unknown>; result?: unknown; error?: Error }>();

/**
 * Generic hook for fetching data from Supabase — with deduplication.
 *
 * - The first component to call a given `queryFn` triggers the fetch.
 * - All other components using the same `queryFn` wait for / reuse
 *   the cached result — **one request per query, ever**.
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

    let entry = cache.get(queryFn);

    if (!entry) {
      // First caller — kick off the fetch and store the promise
      const promise = queryFn()
        .then((result) => {
          entry!.result = result;
          return result;
        })
        .catch((err) => {
          entry!.error = err instanceof Error ? err : new Error(String(err));
          throw entry!.error;
        });
      entry = { promise };
      cache.set(queryFn, entry);
    }

    // All callers (including the first) wait on the shared promise
    entry.promise
      .then((result) => setData(result as T))
      .catch((err) => {
        console.error("[useQuery] Supabase fetch failed:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
