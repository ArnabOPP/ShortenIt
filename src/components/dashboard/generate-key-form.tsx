"use client";

import { useActionState, useState } from "react";
import { Plus, Copy, TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateApiKeyAction, type GenerateKeyState } from "@/app/dashboard/api/actions";

const initialState: GenerateKeyState = {};

export function GenerateKeyForm() {
  const [state, formAction, pending] = useActionState(generateApiKeyAction, initialState);
  const [copied, setCopied] = useState(false);

  if (state.newKey) {
    return (
      <div className="flex flex-col gap-3 rounded-xl border border-secondary/40 bg-secondary-container/20 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-on-surface">
          <TriangleAlert className="h-4 w-4 text-secondary" />
          Copy your new key now — you won&apos;t be able to see it again.
        </p>
        <div className="flex items-center gap-2 rounded-lg bg-surface-container-lowest px-3 py-2 font-mono text-sm text-on-surface">
          <span className="flex-1 truncate">{state.newKey}</span>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(state.newKey!);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="rounded-md p-1.5 text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        {copied && <p className="text-xs text-secondary">Copied to clipboard.</p>}
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-2 sm:flex-row sm:items-end">
      <div className="flex-1">
        <Input name="name" label="Key name" placeholder="Production Main" />
      </div>
      <Button type="submit" disabled={pending} className="sm:mb-0.5">
        <Plus className="h-4 w-4" />
        {pending ? "Generating…" : "Generate New Key"}
      </Button>
      {state.error && <p className="text-sm text-error">{state.error}</p>}
    </form>
  );
}
