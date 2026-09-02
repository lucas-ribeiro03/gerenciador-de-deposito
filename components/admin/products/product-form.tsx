"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "react-hot-toast";
import {
  createProductSchema,
  type CreateProductSchema,
} from "@/schemas/product/create-product-schema";

import { createProductAction } from "@/actions/product/create-product-action";

import { ImageUpload } from "@/components/image-upload/image-upload";

import { SubmitButton } from "@/components/common/submit-button";
import { FieldError } from "@/components/common/field-error";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { updateProductAction } from "@/actions/product/update-product-action";
import type { EditProduct } from "@/services/product/get-product-service";

interface ProductFormProps {
  product?: EditProduct;

  categories: {
    id: string;
    name: string;
  }[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  

  // const [currentImage] = useState(product?.imageUrl ?? null);

  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),

    defaultValues: {
      name: product?.name ?? "",

      description: product?.description ?? "",

      categoryId: product?.categoryId ?? "",

      price: product ? String(product.price) : "",

      promotionalPrice: product?.promotionalPrice
        ? String(product.promotionalPrice)
        : "",

      isAvailable: product?.isAvailable ?? true,
    },
  });

  useEffect(() => {
    console.log(form.formState.errors);
  });

  async function handleSubmit(data: CreateProductSchema) {
    if (!image) {
      toast.error("Selecione uma imagem.");

      return;
    }

    const formData = new FormData();

    formData.append("image", image);

    formData.append("name", data.name);

    formData.append("description", data.description ?? "");

    formData.append("categoryId", data.categoryId);

    formData.append("price", data.price);

    formData.append("promotionalPrice", data.promotionalPrice ?? "");

    formData.append("isAvailable", String(data.isAvailable));

    const response = product
      ? await updateProductAction({ productId: product.id, formData: formData })
      : await createProductAction(formData);

    if (!response.success) {
      toast.error(response.message);

      return;
    }

    toast.success(response.message);

    router.push("/admin/products");

    router.refresh();
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Label className="mb-3 block">Imagem do Produto</Label>

            <ImageUpload
              value={image}
              onChange={setImage}
              currentImage={product?.imageUrl}
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>

              <Input
                id="name"
                placeholder="Ex: Heineken Long Neck"
                {...form.register("name")}
              />

              <FieldError message={form.formState.errors.name?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>

              <Textarea
                id="description"
                rows={5}
                placeholder="Descrição do produto..."
                {...form.register("description")}
              />

              <FieldError
                message={form.formState.errors.description?.message}
              />
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>

              <Select
                // eslint-disable-next-line react-hooks/incompatible-library
                value={form.watch("categoryId")}
                onValueChange={(value) =>
                  form.setValue("categoryId", value ? value : "", {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FieldError message={form.formState.errors.categoryId?.message} />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Preço</Label>

              <Input
                id="price"
                type="number"
                step="0.01"
                min={0}
                placeholder="0,00"
                {...form.register("price")}
              />

              <FieldError message={form.formState.errors.price?.message} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="promotionalPrice">Preço Promocional</Label>

              <Input
                id="promotionalPrice"
                type="number"
                step="0.01"
                min={0}
                placeholder="Opcional"
                {...form.register("promotionalPrice")}
              />

              <FieldError
                message={form.formState.errors.promotionalPrice?.message}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
            <Checkbox
              id="isAvailable"
              className="size-4 accent-(--primary)"
              checked={form.watch("isAvailable")}
              onCheckedChange={(checked) =>
                form.setValue("isAvailable", checked === true)
              }
            />

            <div>
              <Label htmlFor="isAvailable">Produto disponível</Label>

              <p className="text-sm text-muted-foreground">
                Produtos indisponíveis não aparecerão para os clientes.
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <SubmitButton
              loadingText={<Loader2Icon className="animate-spin" />}
            >
              Salvar Produto
            </SubmitButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
