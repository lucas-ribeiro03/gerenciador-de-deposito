import { cn } from "@/lib/utils";

type PageTitleProps = React.ComponentProps<"h1">;

export function PageTitle({ className, ...props }: PageTitleProps) {
  return (
    <h1
      className={cn(
        "text-2xl font-bold tracking-tight text-foreground md:text-3xl",
        className,
      )}
      {...props}
    />
  );
}
