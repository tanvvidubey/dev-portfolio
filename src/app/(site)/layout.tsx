import { AppShell } from "@/components/shell/AppShell";
import { SiteFooter } from "@/components/shell/SiteFooter";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell>
      <main
        id="main"
        className="relative z-10 min-h-[calc(100vh-var(--shell-height)-5rem)]"
      >
        {children}
      </main>
      <SiteFooter />
    </AppShell>
  );
}
