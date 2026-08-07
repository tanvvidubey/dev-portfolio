export const stackGroups = [
  {
    title: "Languages",
    items: [
      { name: "TypeScript", why: "Reliable building blocks for modern web apps." },
      { name: "Python", why: "APIs, AI features, and data-heavy services." },
      { name: "SQL", why: "Structured data when accuracy matters." },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "Next.js / React", why: "Fast, polished product interfaces." },
      { name: "Vite", why: "Lighter apps when a full framework isn't needed." },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "FastAPI", why: "Quick, clear APIs for AI and realtime features." },
      { name: "Express / Django", why: "Auth-heavy products and control planes." },
      { name: "Postgres", why: "Trusted source of truth for product data." },
    ],
  },
  {
    title: "Platform",
    items: [
      { name: "Docker / AWS / Vercel", why: "Ship the same app locally and in production." },
      { name: "Stripe / Clerk", why: "Payments and sign-in without reinventing the wheel." },
    ],
  },
] as const;
