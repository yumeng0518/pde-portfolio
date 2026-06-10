import { cn } from "@/lib/cn";

type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  depth?: "sm" | "md" | "lg";
  hover?: boolean;
};

const depthStyles = {
  sm: "bg-[var(--glass-bg-sm)] backdrop-blur-[12px] border-[var(--glass-border-sm)] shadow-[var(--glass-shadow-sm)]",
  md: "bg-[var(--glass-bg-md)] backdrop-blur-[20px] border-[var(--glass-border-md)] shadow-[var(--glass-shadow-md)]",
  lg: "bg-[var(--glass-bg-lg)] backdrop-blur-[32px] border-[var(--glass-border-lg)] shadow-[var(--glass-shadow-lg)]",
};

export function GlassPanel({
  className,
  depth = "md",
  hover = false,
  children,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-500 ease-out",
        depthStyles[depth],
        hover &&
          "hover:-translate-y-1 hover:shadow-[var(--glass-shadow-hover)] hover:border-[var(--glass-border-hover)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]",
        className,
      )}
    >
      <span className="h-px w-6 bg-[var(--accent)]" />
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-balance text-3xl font-semibold leading-[1.15] tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl lg:text-[2.75rem]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
