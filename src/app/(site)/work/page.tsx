import type { Metadata } from "next";
import { Page } from "@/components/Page";
import { PageHeader } from "@/components/PageHeader";
import { WorkIndex } from "@/components/work/WorkIndex";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects by Tanvi Dubey.",
};

export default function WorkPage() {
  return (
    <Page wide>
      <PageHeader
        label="Work"
        title="Selected projects"
        description="Professional work and personal builds. Filter by type or topic, then open a case study for the decisions behind the ship."
      />
      <WorkIndex projects={projects} />
    </Page>
  );
}
