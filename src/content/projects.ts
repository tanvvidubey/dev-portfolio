export type ProjectStatus = "live" | "private" | "archived";
export type ProjectKind = "professional" | "personal";

export type Project = {
  slug: string;
  name: string;
  description: string;
  /** One-line blurb for compact cards */
  blurb?: string;
  /** Intentionally unused, portfolio shows details only, never live links. */
  url?: string;
  tags: string[];
  featured: boolean;
  kind: ProjectKind;
  status: ProjectStatus;
  role?: string;
  problem?: string;
  alternatives?: string[];
  architecture?: string;
  tradeoff?: string;
  outcomes?: string[];
  decisions?: string[];
};

export function hasCaseStudy(project: Project): boolean {
  return Boolean(
    project.problem ||
      project.architecture ||
      project.tradeoff ||
      (project.alternatives && project.alternatives.length > 0) ||
      (project.decisions && project.decisions.length > 0) ||
      (project.outcomes && project.outcomes.length > 0)
  );
}

export const projects: Project[] = [
  {
    slug: "realground",
    name: "RealGround",
    blurb: "Red-team LLM apps, then ship a ranked fix-it report.",
    description:
      "An AI agent security scanner that red-teams LLM applications: prompt injection and jailbreak probes, permission and route mapping, SBOM generation with CVE scanning, and severity-ranked remediation reports teams can act on.",
    tags: ["Security", "AI", "React", "FastAPI", "Docker", "AWS"],
    featured: true,
    kind: "professional",
    status: "private",
    role: "Built the product UI and the FastAPI service that runs scans, normalizes findings, and produces the remediation report.",
    problem:
      "AI apps change constantly (prompts, tools, models, routes). A one-off pen test goes stale fast, and dumping raw scanner output on a security owner is hard to triage. Teams needed a repeatable path from configure → scan → prioritized fixes.",
    alternatives: [
      "Exporting raw results from a single scanner, too noisy for owners who need a clear next action.",
      "Hand-writing every attack from scratch, slower coverage and harder to keep up with new model providers.",
      "Treating SBOM/CVE checks as a separate spreadsheet workflow, which never stayed in sync with the live app.",
    ],
    architecture:
      "A React + Vite web app where you configure a target and run a scan. The FastAPI backend orchestrates Promptfoo and Garak probes, maps permissions and routes, generates an SBOM with Syft, checks CVEs with Grype, and talks to OpenAI, Bedrock, or Ollama depending on the environment. Results are normalized into one severity-ranked report with remediation guidance. Services ship in Docker on AWS ECS/ECR.",
    tradeoff:
      "Fewer highly custom exploits in exchange for faster coverage and a report people can actually triage across providers.",
    decisions: [
      "The ranked remediation report is a product feature, not an after-the-fact spreadsheet.",
      "Support multiple model providers without changing how an operator starts a run.",
      "Keep SBOM and CVE scanning in the same pipeline as behavioral probes so one run covers both.",
    ],
    outcomes: [
      "One path from configure → scan → prioritized fixes instead of stitching tools by hand.",
      "Consistent reports across OpenAI, Bedrock, and Ollama targets.",
      "Deployable scanner stack on AWS ECS/ECR with Dockerized services.",
    ],
  },
  {
    slug: "anvita-ai",
    name: "Anvita AI",
    blurb: "Enterprise agents with roles, credits, audit, and live runs.",
    description:
      "A B2B platform for designing and deploying AI assistants: visual workflow builder, employee-onboarding agent, Slack and MS Teams bots with Azure AD RBAC, credits and billing, and full audit logs.",
    tags: ["AI", "Enterprise", "Next.js", "FastAPI", "Billing", "RBAC"],
    featured: true,
    kind: "professional",
    status: "private",
    role: "Worked across the product UI, Node/Express control plane, and Python FastAPI agent runtime, including live progress streaming.",
    problem:
      "Company rules (who can do what, billing, audit) and long-running agent work do not belong in one fragile process. Operators also need to watch multi-step runs live and ship assistants into Slack or Teams without reinventing auth each time.",
    alternatives: [
      "One big backend for everything, rejected because auth, billing, and live updates already lived in a different stack.",
      "Serverless-only steps with no dedicated runtime, harder to debug multi-step runs with streaming progress.",
      "Burying bot integrations in ad-hoc scripts, no shared RBAC or audit trail.",
    ],
    architecture:
      "Turborepo monorepo: Next.js for the visual workflow builder and portals; Express + Prisma + Supabase Postgres + Redis for the control plane (login, roles, credits, audit, Azure AD RBAC); FastAPI for the agent runtime that executes steps and streams progress over Socket.IO. Assistants surface in Slack and MS Teams. Files go to AWS S3; services run in Docker.",
    tradeoff:
      "Two systems to maintain so governance and execution can improve on different schedules, with clearer ownership boundaries.",
    decisions: [
      "Keep company controls separate from the engine that runs agents.",
      "Treat audit logs, credits, and permissions as day-one product requirements.",
      "Stream run progress so operators can intervene instead of waiting on a black box.",
    ],
    outcomes: [
      "Visual workflows and governed assistants with credits and audit on the control plane.",
      "Slack/Teams bots sharing the same RBAC model as the web product.",
      "Live run visibility for multi-step agent work.",
    ],
  },
  {
    slug: "marlo",
    name: "Marlo",
    blurb: "Agency ops with AI plans, capacity boards, and Stripe.",
    description:
      "Multi-tenant marketing operations SaaS for agencies: AI-generated 30/90-day plans, a capacity-aware Kanban with at-risk flags, a versioned prompt studio, and OAuth into Google Analytics, Ads, and HubSpot.",
    tags: ["SaaS", "Next.js", "AI", "Stripe", "Drizzle", "Clerk"],
    featured: true,
    kind: "professional",
    status: "private",
    role: "Full stack across the product, billing, AI planning, prompt studio, and integration surfaces.",
    problem:
      "Agencies draft AI plans that never land on a board people trust, boards ignore real capacity, and many client accounts must stay isolated. Prompts also need to be versioned like product artifacts, not buried in config.",
    alternatives: [
      "A separate database per client, too expensive to operate early on.",
      "Prompts buried in env/config, no way for the team to version and improve them in-product.",
      "Plans in one tool and capacity in another, so risk never shows up next to the work.",
    ],
    architecture:
      "Next.js App Router product for admin and client portals on one codebase. Plans are drafted with the Vercel AI SDK, then live on the same capacity-aware Kanban with at-risk flags. Prompt studio versions prompts in-product. Clerk handles RBAC; Drizzle + Neon Postgres for data; Stripe for usage-metered billing; OAuth to Google Analytics, Ads, and HubSpot. Covered with Vitest and Playwright.",
    tradeoff:
      "Shared infrastructure for speed, so every new feature must respect tenant boundaries and metering.",
    decisions: [
      "Prompts are versioned product artifacts, not one-off strings.",
      "AI plans sit next to capacity and risk on the same board.",
      "Admin and client experiences share one multi-tenant codebase with org-scoped isolation.",
    ],
    outcomes: [
      "Admin and client portals with metered Stripe billing.",
      "30/90-day AI plans that land on a capacity-aware board.",
      "Connected planning via Analytics, Ads, and HubSpot OAuth.",
    ],
  },
  {
    slug: "rementia",
    name: "Rementia",
    blurb: "Voice and text dementia care with encrypted clinical context.",
    description:
      "A HIPAA-oriented dementia care assistant with real-time voice and text chat, RAG over medical knowledge, OCR prescription extraction with drug-interaction checks, and caregiver dashboards so context is shared safely.",
    tags: ["Healthcare", "Privacy", "React", "FastAPI", "Bedrock", "RAG"],
    featured: true,
    kind: "professional",
    status: "private",
    role: "Built patient and caregiver experiences plus supporting FastAPI services for chat, voice, retrieval, and encrypted storage.",
    problem:
      "Tools that only chat with the patient leave caregivers in the dark. Prescriptions arrive as scans. Health data needs encryption at rest, not demo shortcuts, and voice has to work in the same loop as text.",
    alternatives: [
      "Text-only first, caregivers and patients often need voice.",
      "A third-party chatbot, weak control over encryption, retention, and clinical RAG.",
      "Separate caregiver tools, context stays trapped in the patient thread.",
    ],
    architecture:
      "React 19 web app for patients and caregivers. FastAPI backend with PostgreSQL, JWT auth, and Fernet encryption for sensitive fields. Real-time voice/text over WebSockets. RAG over medical knowledge via AWS Bedrock (Nova Sonic, Titan). OCR extracts prescriptions and checks interactions. Caregiver dashboards share context without exposing raw secrets. Deployed with Docker and Nginx.",
    tradeoff:
      "A narrower feature set outside the care loop so privacy, voice, and retrieval stay correct first.",
    decisions: [
      "Caregiver dashboard and patient chat are one system.",
      "Encrypt sensitive fields at rest; do not rely on network isolation alone.",
      "Treat voice as a first-class channel beside text.",
    ],
    outcomes: [
      "Realtime voice and text with retrieval and prescription help in a privacy-first setup.",
      "Caregivers see shared context without living inside the patient transcript.",
      "Hardened deploy path with Docker and Nginx.",
    ],
  },
  {
    slug: "kotomo",
    name: "Kotomo",
    blurb: "Personal Japanese lessons and practice in one app.",
    description:
      "A personal Japanese learning app with structured lessons and practice flows, built as a focused solo product rather than a generic notes tool.",
    tags: ["Learning", "Next.js"],
    featured: false,
    kind: "personal",
    status: "private",
    role: "Solo project: product design and full stack.",
    problem:
      "Wanted a focused place to practice Japanese without bolting features onto a generic notes app or juggling disconnected drills.",
    architecture:
      "A single web app for learning flows and practice sessions. Built for personal use and iteration, not linked as a public product here.",
    decisions: [
      "Keep it as one deployable app instead of a heavier multi-service setup.",
      "Optimize for daily practice loops over feature sprawl.",
    ],
    outcomes: [
      "A learning app I can improve without a client brief.",
    ],
  },
  {
    slug: "mann",
    name: "Mann",
    blurb: "Private voice journal with meaning search across languages.",
    description:
      "A private voice journal where you speak or write in Hindi, English, or Hinglish, then find past entries by meaning and mood rather than exact keywords.",
    tags: ["Privacy", "Voice", "AI"],
    featured: false,
    kind: "personal",
    status: "private",
    role: "Solo project: client, backend, and retrieval for meaning search.",
    problem:
      "Keyword search fails when you remember a feeling, not a phrase. Mixed-language voice needs to stay private and searchable by meaning.",
    architecture:
      "Capture voice or text, extract mood and themes, and search past entries by meaning rather than exact words. Designed as a private daily journal.",
    decisions: [
      "Meaning search over keyword-only history.",
      "Treat Hinglish as a first-class input beside Hindi and English.",
    ],
    outcomes: [
      "A private loop: capture → understand mood → find related past entries.",
    ],
  },
  {
    slug: "stratusedge",
    name: "StratusEdge",
    blurb: "Enterprise chat grounded in company knowledge.",
    description:
      "An enterprise AI platform with secure chat and answers grounded in internal documents via a retrieval pipeline and streaming responses.",
    tags: ["Enterprise", "AI", "Django", "RAG"],
    featured: false,
    kind: "professional",
    status: "private",
    role: "Retrieval pipeline, streaming chat UI, and production deployment.",
    problem:
      "Teams needed trustworthy answers from internal documents, not a brittle chatbot that invents context.",
    architecture:
      "A chat interface that streams answers while the backend retrieves from company knowledge and generates responses in production containers. Retrieval and generation stay separate steps.",
    decisions: [
      "Streaming responses instead of waiting for a full reply.",
      "Keep retrieval and generation as separate, inspectable steps.",
    ],
    outcomes: [
      "Production chat with grounded answers and a repeatable deploy.",
    ],
  },
  {
    slug: "bookmyprof",
    name: "BookMyProf",
    blurb: "Trainer marketplace with escrowed Stripe payouts.",
    description:
      "A marketplace connecting training centres with freelance trainers: job posts, proposals, role-based dashboards for admin, trainer, and client, and Stripe escrow so payouts stay tied to delivery.",
    tags: ["Marketplace", "Payments", "Stripe", "RBAC"],
    featured: false,
    kind: "professional",
    status: "private",
    role: "Marketplace flows, payments, and role-based React dashboards.",
    problem:
      "Centres and trainers needed a trusted path to post work, propose, agree, and move money without informal WhatsApp threads and messy invoices.",
    architecture:
      "REST APIs for jobs and proposals, Stripe escrow for funds, and separate dashboards for admins, trainers, and clients with clear role permissions.",
    decisions: [
      "Stripe escrow instead of a custom wallet.",
      "Keep job state and money movement aligned in one workflow.",
    ],
    outcomes: [
      "End-to-end marketplace flows for all three roles.",
      "Payouts gated on delivery through escrow.",
    ],
  },
  {
    slug: "fundsprout",
    name: "Fundsprout",
    blurb: "Grant discovery, drafting, tracking, and PDF export.",
    description:
      "A grant platform for discovering opportunities, drafting proposals with document extraction, tracking status, and exporting PDFs after Google sign-in.",
    tags: ["Grants", "Documents", "OAuth"],
    featured: false,
    kind: "professional",
    status: "private",
    role: "APIs and frontend for discovery, proposals, tracking, and export.",
    problem:
      "Grant discovery and drafting lived in scattered files and inboxes. Teams needed structured workflows from opportunity to submitted PDF.",
    architecture:
      "Signed-in flows with Google OAuth, document extraction for drafting help, proposal tracking, and PDF export on a scalable backend and frontend.",
    outcomes: [
      "Shipped grant workflows from discovery through export.",
    ],
  },
  {
    slug: "lightbreak",
    name: "Lightbreak",
    blurb: "Assemble newsletter issues from many sources.",
    description:
      "A newsletter operations tool to pull sources together, build an issue, and export to common email platforms.",
    tags: ["Publishing", "Next.js"],
    featured: false,
    kind: "professional",
    status: "private",
    role: "Product surfaces and email-platform integrations.",
    problem:
      "Operators needed one place to assemble issues from many sources and ship to their email provider without copy-paste chaos.",
    architecture:
      "Connect sources, edit an issue, and export to common email platforms from a single operator workflow.",
    outcomes: ["Operator workflow from sources → issue → export."],
  },
  {
    slug: "oodles-ai",
    name: "Oodles AI",
    blurb: "Shared hub for multiple enterprise AI offerings.",
    description:
      "A hub of AI solutions spanning recommendations, conversational experiences, and agent-style workflows for different industries behind shared services.",
    tags: ["AI", "Enterprise"],
    featured: false,
    kind: "professional",
    status: "private",
    role: "Full stack delivery on the solutions hub.",
    problem:
      "Several AI service lines needed one coherent product surface instead of disconnected demos.",
    architecture:
      "Shared hub wiring recommendation, conversational, and agent offerings behind common services and UI patterns.",
    outcomes: [
      "Maintained and shipped hub surfaces for enterprise AI offerings.",
    ],
  },
  {
    slug: "gdpr-soft",
    name: "GDPR Soft",
    blurb: "Privacy policies, DPIAs, and DSRs in one workspace.",
    description:
      "A compliance workspace for privacy policies, impact assessments, registers, data-subject requests, and breach handling, with AI-assisted drafting.",
    tags: ["Compliance", "Next.js", "AI"],
    featured: false,
    kind: "professional",
    status: "private",
    role: "Compliance workflows and drafting assistance in the product.",
    problem:
      "Compliance work spans many registers and drafts; teams needed one place to manage them without losing auditability.",
    architecture:
      "Workflows for policies, assessments, registers, requests, and breach handling, with AI-assisted drafting where it speeds first drafts.",
    outcomes: ["An all-in-one compliance workflow surface."],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured && p.kind === "professional");
}

export function getProfessionalProjects(): Project[] {
  return projects.filter((p) => p.kind === "professional");
}

export function getPersonalProjects(): Project[] {
  return projects.filter((p) => p.kind === "personal");
}

export function getCaseStudyProjects(): Project[] {
  return projects.filter(hasCaseStudy);
}
