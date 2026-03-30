"use client";

import { useEffect, useState } from "react";

const OPEN_HOUR = 11;
const CLOSE_HOUR = 24; // medianoche

function checkIsOpen(): boolean {
  const hour = new Date().getHours();
  return hour >= OPEN_HOUR && hour < CLOSE_HOUR;
}

interface Props {
  className?: string;
  showClosed?: boolean; // si false, no renderiza nada cuando está cerrado
}

export default function OpenStatusBadge({ className = "", showClosed = true }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOpen(checkIsOpen());
    const interval = setInterval(() => setOpen(checkIsOpen()), 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;
  if (!open && !showClosed) return null;

  if (open) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-green-500/15 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-green-400 ring-1 ring-green-500/30 ${className}`}
      >
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
        Abierto ahora
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-white/8 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wide text-white/30 ring-1 ring-white/10 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
      Cerrado · Abre 11 hs
    </span>
  );
}
