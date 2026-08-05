"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value: File | null;

  currentImage?: string | null;

  onChange: (file: File | null) => void;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg"];

const MAX_SIZE = 5 * 1024 * 1024;

export function ImageUpload({
  value,
  onChange,
  currentImage,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = value ? URL.createObjectURL(value) : (currentImage ?? null);

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast("Selecione apenas PNG, JPG ou JPEG.");

      return;
    }

    if (file.size > MAX_SIZE) {
      toast("A imagem deve possuir no máximo 5MB.");

      return;
    }

    onChange(file);
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept=".png,.jpg,.jpeg"
        onChange={handleSelect}
      />

      {!preview ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-72 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-card transition hover:border-primary hover:bg-muted"
        >
          <ImagePlus className="mb-4 size-12 text-primary" />

          <span className="font-semibold">
            Clique para selecionar uma imagem
          </span>

          <span className="mt-2 text-sm text-muted-foreground">
            PNG, JPG ou JPEG • Máx. 5MB
          </span>
        </button>
      ) : (
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-xl border">
            <Image
              src={preview}
              alt="Preview"
              width={800}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" onClick={() => inputRef.current?.click()}>
              Alterar imagem
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
