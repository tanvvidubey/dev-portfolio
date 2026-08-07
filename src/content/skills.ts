export type SkillGroup = {
  title: string;
  summary?: string;
  items: string[];
};

export const skillsIntro =
  "Backend, frontend, databases, cloud, security, and payments, plus AI when the product needs it.";

export const skills: SkillGroup[] = [
  {
    title: "Backend & APIs",
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
    items: ["OAuth 2.0", "RBAC", "JWT", "Stripe API", "ACID Transactions"],
  },
  {
    title: "AI & Integrations",
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
