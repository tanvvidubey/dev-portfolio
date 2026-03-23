import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanvi Dubey | Full Stack Developer",
  description:
    "Full Stack Developer building scalable web applications, REST APIs, and production systems. Python, Django, React, PostgreSQL, Stripe, Docker.",
  openGraph: {
    title: "Tanvi Dubey | Full Stack Developer",
    description:
      "Full Stack Developer building web apps, REST APIs, databases, auth, payments, cloud. Python, Django, React.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)] antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <div className="gradient-orb gradient-orb-1" aria-hidden />
          <div className="gradient-orb gradient-orb-2" aria-hidden />
          <div className="gradient-orb gradient-orb-3" aria-hidden />
          <Nav />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
