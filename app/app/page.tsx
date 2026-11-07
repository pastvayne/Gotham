import type { Metadata } from "next";
import { Overview } from "@/components/console/views";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
  return (
    <main id="main">
      <Overview />
    </main>
  );
}
