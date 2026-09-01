"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useOrderFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "ALL";
  const period = searchParams.get("period") ?? "today";
  const sort = searchParams.get("sort") ?? "newest";

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        params.delete(key);
        return;
      }

      params.set(key, value);
    });

    const queryString = params.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  return {
    search,
    status,
    period,
    sort,
    startDate,
    endDate,
    updateParams,
  };
}
