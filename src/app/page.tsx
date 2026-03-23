import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

const projects = [
  {
    name: "StratusEdge",
    description:
      "Enterprise platform with secure auth, real-time streaming chat UI (React + Vite), and backend APIs. RAG pipeline, vector store, and deployment on OCI with Docker and Nginx.",
    url: "https://stratusedge.ai/",
    tags: ["Django", "React", "REST APIs", "Docker"],
    featured: true,
  },
  {
    name: "BookMyProf",
    description:
      "B2B marketplace connecting training centres with freelance trainers. Full stack: job posting and proposal APIs, Stripe escrow, PostgreSQL, role-based React dashboards for admin, trainer, and client.",
    url: "http://14.102.190.53:5024/",
    tags: ["Marketplace", "Stripe", "PostgreSQL", "React"],
    featured: true,
  },
  {
    name: "Fundsprout",
    description:
      "Grant platform with OAuth, document workflows, and PDF export. Backend APIs for discovery and drafting; frontend for proposals and compliance tracking.",
    url: "https://fundsprout.ai/",
    tags: ["OAuth", "APIs", "Document workflows", "React"],
    featured: false,
  },
  {
    name: "Lightbreak",
    description:
      "Newsletter production platform built with Next.js and TypeScript: connect sources (RSS, Beehiiv, Substack, etc.), build issues with an editor, and export to any ESP. Integrations and frontend for operators.",
    url: "https://lightbreak.ai/",
    tags: ["Next.js", "TypeScript", "Integrations", "ESP", "APIs"],
    featured: false,
  },
  {
    name: "Oodles AI",
    description:
      "Oodles Technologies’ AI solutions hub: services spanning recommendation systems, conversational AI, agentic AI, and industry verticals. Built and maintained with full stack tooling.",
    url: "https://artificialintelligence.oodles.io/",
    tags: ["Full Stack", "Enterprise", "APIs"],
    featured: false,
  },
  {
    name: "GDPR Soft",
    description:
      "GDPR compliance platform built with Next.js and TypeScript: manage privacy policies, legitimate interest assessments, DPIA, ROPA, data subject access requests, and breach management. AI-powered tools, quick import, and an all-in-one workflow from register to generate and manage.",
    url: "http://14.102.190.53:3003/",
    tags: ["Next.js", "TypeScript", "GDPR", "Compliance", "AI"],
    featured: false,
  },
];

const skills = [
  {
    title: "Backend & APIs",
    icon: "{}",
    items: [
      "Python",
      "Django",
      "Django REST Framework",
      "FastAPI",
      "SQL",
      "REST APIs",
      "Webhooks",
    ],
  },
  {
    title: "Frontend",
    icon: "</>",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Vite",
    ],
  },
  {
    title: "Data & Infrastructure",
    icon: "▣",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "AWS",
      "OCI",
      "Docker",
      "Nginx",
      "Gunicorn",
      "CI/CD",
    ],
  },
  {
    title: "Security & Payments",
    icon: "◆",
    items: ["OAuth 2.0", "RBAC", "JWT", "Stripe API", "ACID Transactions"],
  },
  {
    title: "AI & Integrations",
    icon: "◇",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "LLM APIs",
      "Embeddings",
      "ChromaDB",
    ],
  },
];

const experience = [
  {
    company: "Oodles Technologies",
    location: "Gurugram, India",
    role: "Full Stack Developer",
    period: "Dec 2024 – Present",
    highlights: [
      "Built backend RAG pipeline and React + Vite frontend with real-time streaming; optimized APIs and deployed on OCI with Docker and Nginx.",
      "B2B marketplace with REST APIs, Stripe escrow, PostgreSQL with ACID workflows, role-based React dashboards (admin, trainer, client).",
      "Multi-agent orchestration system integrating WhatsApp, Email, and transcripts; structured retrieval and prompt pipelines.",
      "Grant platform with Google OAuth, document extraction workflows, and PDF export; scalable backend and frontend.",
    ],
  },
  {
    company: "Commudle",
    location: "Delhi, India",
    role: "Data Science & AI Intern",
    period: "Aug 2024 – Dec 2024",
    highlights: [
      "Built classification pipeline producing standardized JSON outputs; hybrid rule-based + API integration, integrated into production workflows.",
    ],
  },
];

const education = [
  {
    institution: "JIMS, Rohini",
    location: "Delhi, India",
    degree: "Master of Computer Applications (MCA)",
    period: "2023 – 2025",
  },
  {
    institution: "University of Delhi",
    location: "Delhi, India",
    degree: "Bachelor of Vocational Studies – Web Designing",
    period: "2020 – 2023",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        id="hero"
        className="relative px-4 pt-24 pb-16 sm:min-h-[88vh] sm:px-6 sm:pt-28 sm:pb-20 md:px-8 md:pt-32 lg:px-12 lg:pt-36 xl:px-16"
      >
        <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden />
        <div className="relative mx-auto flex max-w-5xl flex-col justify-center">
          <p className="section-label font-mono mb-4 sm:mb-6">
            Full Stack Developer
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="text-[var(--foreground)]">Hi, I&apos;m </span>
            <span className="gradient-text">Tanvi Dubey</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium text-[var(--muted)] sm:mt-6 sm:text-xl md:text-2xl">
            I build scalable web applications from frontend to backend with REST APIs,
            databases, auth, payments, and cloud deployment. I also ship
            AI-powered features when the product needs them.
          </p>
          {/* <p className="mt-3 max-w-2xl text-sm text-[var(--muted-foreground)] sm:mt-4 sm:text-base">
            Delivered impact: 40% API latency reduction, 35% fewer manual ops
            via role-based dashboards, 50% faster document workflows.
          </p> */}
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-12 sm:gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-lg shadow-indigo-500/25 transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] sm:px-6 sm:py-3.5"
            >
              View projects
              <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--muted)] hover:bg-[var(--card-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] sm:px-6 sm:py-3.5"
            >
              Get in touch
            </a>
          </div>
          {/*           <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--border)] pt-6 font-mono text-xs text-[var(--muted)] sm:mt-16 sm:gap-x-10 sm:pt-8 sm:text-sm">
            <span><span className="text-[var(--accent)] font-medium">Python & React</span> (main stack)</span>
            <span>Django · PostgreSQL · REST APIs · Stripe</span>
            <span>Docker · Nginx · AWS · OCI</span>
          </div> */}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-t border-[var(--border)] bg-[var(--section-alt)] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12 xl:px-16"
      >
        <div className="mx-auto max-w-4xl">
          <p className="section-label font-mono">About</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-[var(--foreground)] sm:text-3xl md:text-4xl">
            Driven by impact
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted-foreground)] sm:mt-8 sm:space-y-6 sm:text-lg">
            <p>
              I architect and ship full stack
              products: responsive frontends, robust REST APIs, relational and
              vector databases, auth and payments, and cloud deployment. I work
              across the stack from React UIs and Django backends to PostgreSQL,
              Stripe, OAuth, and Docker—and I&apos;ve built AI features (RAG, LLMs) into
              production products where they add value.
            </p>
            <p>
              I care about clean architecture, measurable outcomes, and
              maintainable code. Whether it&apos;s a B2B marketplace, a grant
              platform, or an internal tool, I focus on shipping reliable
              systems that scale.
            </p>
            <p className="text-[var(--muted)]">
              When I&apos;m not coding, I&apos;m either writing poetry or stories, or drawing illustrations.
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-[var(--border)] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="section-label font-mono">Skills</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-[var(--foreground)] sm:text-3xl md:text-4xl">
            What I work with
          </h2>
          <p className="mt-3 text-sm text-[var(--muted-foreground)] sm:text-base">
            Backend, frontend, databases, cloud, security, and payments plus AI when the product needs it.
          </p>
          <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
            {skills.map((group) => (
              <div
                key={group.title}
                className="card-hover flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--muted)] sm:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl text-[var(--accent)]" aria-hidden>
                    {group.icon}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">
                    {group.title}
                  </h3>
                </div>
                <div className="mt-4 flex flex-1 flex-wrap content-start gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg bg-[var(--section-alt)] px-3 py-1.5 font-mono text-sm text-[var(--muted-foreground)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="work"
        className="border-t border-[var(--border)] bg-[var(--section-alt)] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12 xl:px-16"
      >
        <div className="mx-auto max-w-4xl">
          <p className="section-label font-mono">Experience</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-[var(--foreground)] sm:text-3xl md:text-4xl">
            Where I&apos;ve worked
          </h2>
          <div className="mt-10 space-y-12 sm:mt-14 sm:space-y-16">
            {experience.map((job, idx) => (
              <div
                key={job.company}
                className="relative flex gap-4 sm:gap-8 md:gap-12"
              >
                <div className="flex flex-shrink-0 flex-col items-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)] font-display text-sm font-bold text-[var(--accent-foreground)] sm:h-10 sm:w-10">
                    {idx + 1}
                  </span>
                  {idx < experience.length - 1 && (
                    <div className="mt-2 h-full min-h-[2rem] w-px flex-1 bg-[var(--border)]" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pb-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between">
                    <h3 className="font-display text-lg font-semibold text-[var(--foreground)] sm:text-xl">
                      {job.role}
                    </h3>
                    <span className="font-mono text-xs text-[var(--muted)] sm:text-sm">
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--accent)] font-medium sm:text-base">
                    {job.company} · {job.location}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--muted-foreground)] sm:mt-6 sm:space-y-3 sm:text-base">
                    {job.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 sm:gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects - Bento-style grid */}
      <section
        id="projects"
        className="border-t border-[var(--border)] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12 xl:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="section-label font-mono">Projects</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-[var(--foreground)] sm:text-3xl md:text-4xl">
            Things I&apos;ve built
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--muted-foreground)] sm:mt-4 sm:text-base">
            Products and platforms I&apos;ve shipped. Want to see more? Get in touch.
          </p>
          <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover group flex min-h-[220px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--card-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] sm:min-h-[240px] sm:p-6"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)]">
                    {project.name}
                  </h3>
                  <span className="text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)] shrink-0" aria-hidden>
                    →
                  </span>
                </div>
                <p className="mt-3 flex-1 min-h-0 text-sm leading-relaxed text-[var(--muted-foreground)]">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-[var(--section-alt)] px-2.5 py-1 font-mono text-xs text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="border-t border-[var(--border)] bg-[var(--section-alt)] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-4xl">
          <p className="section-label font-mono">Education</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-[var(--foreground)] sm:text-3xl md:text-4xl">
            Background
          </h2>
          <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
            {education.map((edu) => (
              <div
                key={edu.institution}
                className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 transition-colors hover:border-[var(--muted)] sm:p-6"
              >
                <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">
                  {edu.degree}
                </h3>
                <p className="mt-2 text-[var(--accent)] font-medium">
                  {edu.institution}, {edu.location}
                </p>
                <p className="mt-2 font-mono text-sm text-[var(--muted)]">
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-[var(--border)] px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-12 lg:py-28 xl:px-16"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label font-mono">Contact</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-[var(--foreground)] sm:text-3xl md:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-base text-[var(--muted-foreground)] sm:mt-5 sm:text-lg">
            I&apos;m open to discussing full stack projects, product work, or partnership
            opportunities.
          </p>
          <ContactForm />
          <p className="mt-8 text-sm text-[var(--muted)]">Or reach out directly</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="mailto:tanvidubey2006@gmail.com"
              className="inline-flex items-center rounded-xl border-2 border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--muted)] hover:bg-[var(--card-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] sm:px-6 sm:py-3.5"
            >
              Email
            </a>
            <a
              href="tel:+919873330755"
              className="inline-flex items-center rounded-xl border-2 border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--muted)] hover:bg-[var(--card-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] sm:px-6 sm:py-3.5"
            >
              Phone
            </a>
            <Link
              href="https://github.com/tanvvidubey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border-2 border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--muted)] hover:bg-[var(--card-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] sm:px-6 sm:py-3.5"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/tanvvidubey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl border-2 border-[var(--border)] bg-[var(--card)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--muted)] hover:bg-[var(--card-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)] sm:px-6 sm:py-3.5"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] bg-[var(--section-alt)] px-4 py-6 text-center sm:px-6 sm:py-8">
        <p className="text-xs text-[var(--muted)] sm:text-sm">
          Designed & built by Tanvi Dubey · © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
