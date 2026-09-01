"use client";

import { OrderPeriodFilter } from "./order-period-filter";
import { OrderSearch } from "./order-search";
import { OrderSortFilter } from "./order-sort-filter";
import { OrderStatusFilter } from "./order-status-filter";

export function OrderFilters() {
  return (
    <div className="space-y-3">
      <OrderSearch />

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <OrderStatusFilter />

        <OrderPeriodFilter />

        <OrderSortFilter />
      </div>
    </div>
  );
}
