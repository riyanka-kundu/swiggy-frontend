"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LucideIcon } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  icon: LucideIcon;
  loading?: boolean;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  subtitle,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  icon: Icon,
  loading = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 rounded-2xl">
        <div className="flex items-center gap-3.5 mb-1">
          <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600 border border-red-100 shrink-0">
            <Icon className="size-5" />
          </div>
          <div>
            <DialogTitle className="text-lg font-bold text-foreground">
              {title}
            </DialogTitle>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </DialogDescription>

        <DialogFooter className="mt-3 flex-row justify-end gap-2.5 sm:gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => onOpenChange(false)}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition hover:bg-muted focus:outline-none disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-red-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Cancelling..." : confirmLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
