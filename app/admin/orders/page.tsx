import { getAdminOrdersService } from "@/services/order/get-admin-orders-service";

import { OrdersList } from "@/components/admin/orders/orders-list";
import { OrderFilters } from "@/components/admin/orders/order-filters/order-filters";

import { orderFiltersSchema } from "@/schemas/order-filter/order-filters-schema";

type OrdersPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    period?: string;
    sort?: string;
  }>;
};

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;

  const filters = orderFiltersSchema.parse(params);

  const orders = await getAdminOrdersService(filters);

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pedidos</h1>

        <p className="text-sm text-muted-foreground">
          Gerencie os pedidos realizados pelos clientes.
        </p>
      </div>

      <OrderFilters />

      <OrdersList orders={orders} />
    </main>
  );
}
