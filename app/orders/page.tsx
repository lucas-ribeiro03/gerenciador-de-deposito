import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getUserOrdersService } from "@/services/order/get-user-orders-service";

import { OrdersList } from "@/components/order/orders-list";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const orders = await getUserOrdersService(session.user.id);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Meus pedidos</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Consulte seus pedidos e seus detalhes.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Você ainda não realizou nenhum pedido.
          </p>
        </div>
      ) : (
        <OrdersList orders={orders} />
      )}
    </main>
  );
}
