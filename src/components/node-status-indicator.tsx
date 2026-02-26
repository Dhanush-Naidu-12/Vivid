import { type ReactNode } from "react";
import { LoaderCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type NodeStatus = "loading" | "success" | "error" | "initial";

export type NodeStatusIndicatorProps = {
  status?: NodeStatus;
  children: ReactNode;
  className?: string;
};

const STATUS_THEMES = {
  success: {
    border: "border-emerald-500",
    iconColor: "bg-emerald-500",
    icon: CheckCircle2,
  },
  error: {
    border: "border-red-500",
    iconColor: "bg-red-500",
    icon: AlertCircle,
  },
  loading: {
    border: "border-blue-500",
    iconColor: "bg-blue-500",
    icon: LoaderCircle,
  },
};

export const NodeStatusIndicator = ({
  status,
  children,
  className,
}: NodeStatusIndicatorProps) => {
  // Return plain children if no status is active
  if (!status || status === "initial") {
    return <div className={cn("relative", className)}>{children}</div>;
  }

  const theme = STATUS_THEMES[status as keyof typeof STATUS_THEMES];
  const Icon = theme.icon;

  return (
    <div className={cn("relative group", className)}>
      {/* Single Unified Border */}
      <div
        className={cn(
          "rounded border-2 bg-background transition-all duration-200",
          theme.border
        )}
      >
        {children}
      </div>

      {/* Small Refined Icon Badge */}
      <div className={cn(
        "absolute -top-1.5 -right-1.5 z-20 flex size-5 items-center justify-center rounded-full text-white shadow-sm",
        theme.iconColor
      )}>
        <Icon 
          className={cn("size-3", status === "loading" && "animate-spin")} 
          strokeWidth={3.5} 
        />
      </div>
    </div>
  );
};