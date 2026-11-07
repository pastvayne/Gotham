import type { Metadata } from "next";
import { ActivityView } from "@/components/console/views";

export const metadata: Metadata = { title: "Activity" };

export default function ActivityPage() {
  return (
    <main id="main">
      <ActivityView />
    </main>
  );
}
