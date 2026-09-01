"use client";

import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/confirm-dialog";
import { XCircle } from "lucide-react";
import { useState } from "react";

interface CancelOrderButtonProps {
  subtitle?: string;
  onCancel: () => void;
  loading?: boolean;
}

export default function CancelOrderButton({
  subtitle,
  onCancel,
  loading = false,
}: CancelOrderButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Cancel
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Cancel Order"
        subtitle={subtitle}
        description="Are you sure you want to cancel this order? This action cannot be undone."
        confirmLabel="Cancel Order"
        icon={XCircle}
        loading={loading}
        onConfirm={() => {
          onCancel();
          setOpen(false);
        }}
      />
    </>
  );
}
