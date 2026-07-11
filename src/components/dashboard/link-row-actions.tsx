"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { MoreVertical, Ban, CheckCircle2, Trash2 } from "lucide-react";
import { deleteLinkAction, setLinkDisabledAction } from "@/app/dashboard/links/actions";

export function LinkRowActions({ linkId, disabled }: { linkId: string; disabled: boolean }) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [pending, startTransition] = useTransition();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleOpen() {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + window.scrollY + 4, left: rect.right + window.scrollX - 176 });
    }
    setOpen((o) => !o);
  }

  function handleToggleDisabled() {
    setOpen(false);
    startTransition(async () => {
      await setLinkDisabledAction(linkId, !disabled);
      router.refresh();
    });
  }

  function handleDelete() {
    setOpen(false);
    if (!confirm("Delete this link permanently? This can't be undone.")) return;
    startTransition(async () => {
      await deleteLinkAction(linkId);
      router.refresh();
    });
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleOpen}
        disabled={pending}
        className="rounded-md p-1.5 text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50"
      >
        <MoreVertical className="h-4 w-4" />
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={menuRef}
            style={{ position: "absolute", top: menuPos.top, left: menuPos.left }}
            className="z-50 w-44 rounded-xl border border-outline-variant/30 bg-surface-container-lowest py-1 shadow-modal"
          >
            <button
              onClick={handleToggleDisabled}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-on-surface hover:bg-surface-container-low"
            >
              {disabled ? <CheckCircle2 className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
              {disabled ? "Enable link" : "Disable link"}
            </button>
            <button
              onClick={handleDelete}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-error hover:bg-error-container/40"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>,
          document.body
        )}
    </>
  );
}
