export type Experience = {
  company: string;
  location: string;
  role: string;
  period: string;
  summary?: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Partex.AI",
    location: "Pune, India",
    role: "Software Engineer - Full Stack Developer",
    period: "Oct 2026 - Present",
    summary:
      "Developing an AI-powered life sciences platform for Dossiers, Systematic Literature Reviews (SLR), and Literature Monitoring (LMR), supporting research and evidence synthesis workflows.",
    highlights: [
      "Building end-to-end product features, including responsive frontend interfaces and backend services using Angular, TypeScript, Python, FastAPI, and Node.js.",
      "Designing REST APIs, implementing business logic, data processing workflows, and frontend-backend integrations.",
      "Developing AI pipelines for document processing, information extraction, and research workflows, integrating AI capabilities into the product architecture.",
      "Contributing across the technology stack to build scalable features, troubleshoot issues, and improve application functionality.",
    ],
  },
  {
    company: "Oodles Technologies",
    location: "Gurugram, India",
    role: "Sr. Associate Consultant - Development (AI)",
    period: "Dec 2024 - Sep 2026",
    summary:
      "Deliver production AI platforms end to end: architecture, data modeling, frontend, backend, and deployment across marketing ops, agent orchestration, AI security, and healthcare.",
    highlights: [
      "Designed multi-tenant SaaS architecture with org-scoped data isolation, RBAC, invite-based onboarding, and usage-metered Stripe billing, serving admin and tenant portals from one codebase.",
      "Engineered RAG pipelines over enterprise and clinical knowledge bases with ChromaDB/FAISS vector search and retrieval tuning, raising answer accuracy 80% over a keyword baseline.",
      "Built multi-agent orchestration with tool-calling into Slack, MS Teams, Jira, and HubSpot, splitting a Node/Express control plane from a Python FastAPI runtime executing agent steps.",
      "Optimized LLM serving for 50% faster inference and trained a YOLOv8 detector to 95% accuracy, cutting latency and compute spend.",
      "Containerized services with Docker and shipped to AWS (ECS, ECR, S3) and Vercel behind Nginx, with JWT auth, Fernet encryption, Socket.IO real-time updates, and Vitest/Playwright coverage.",
    ],
  },
  {
    company: "Commudle",
    location: "Delhi, India",
    role: "Data Science & AI Intern",
    period: "Aug 2024 - Nov 2024",
    summary:
      "Applied data science and AI to community product workflows, from forecasting engagement to automating editorial tagging.",
    highlights: [
      "Built predictive models on community engagement data reaching 85% forecasting accuracy, backed by EDA and feature engineering.",
      "Automated content tagging with a Perplexity AI classifier returning structured JSON, removing manual editorial triage.",
    ],
  },
];
