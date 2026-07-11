"use client";

import { useActionState } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addDomainAction, type AddDomainState } from "@/app/dashboard/domains/actions";

const initialState: AddDomainState = {};

export function AddDomainForm() {
  const [state, formAction, pending] = useActionState(addDomainAction, initialState);

  return (
    <div className="flex flex-col gap-2">
      <form action={formAction} className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input name="domain" label="Add a domain" placeholder="links.yourbrand.com" />
        </div>
        <Button type="submit" disabled={pending} className="sm:mb-0.5">
          <Plus className="h-4 w-4" />
          {pending ? "Adding…" : "Connect Domain"}
        </Button>
      </form>
      {state.error && <p className="text-sm text-error">{state.error}</p>}
    </div>
  );
}
