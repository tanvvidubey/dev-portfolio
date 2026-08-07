"use client";

import { useState, type ReactNode } from "react";
import { BackToTop } from "@/components/BackToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CommandPalette } from "./CommandPalette";
import { SiteNav } from "./SiteNav";

export function AppShell({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <SiteNav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      {children}
      <BackToTop />
    </>
  );
}
