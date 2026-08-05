"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

import { useFormContext } from "react-hook-form";

type SubmitButtonProps = {
  children: React.ReactNode;
  loadingText?: React.ReactNode;
};

export function SubmitButton({
  children,
  loadingText = "Carregando...",
}: SubmitButtonProps) {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  return (
    <Button type="submit" disabled={!isValid || isSubmitting} className="gap-2">
      {isSubmitting ? (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
