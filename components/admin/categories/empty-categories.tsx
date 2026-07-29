import { FolderOpen } from "lucide-react";

export function EmptyCategories() {
  return (
    <div className="flex h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-card">
      <FolderOpen className="mb-4 size-14 text-muted-foreground" />

      <h2 className="text-xl font-semibold">Nenhuma categoria cadastrada</h2>

      <p className="mt-2 text-sm text-muted-foreground">
        Clique em &quot;Nova Categoria&quot; para criar a primeira.
      </p>
    </div>
  );
}
