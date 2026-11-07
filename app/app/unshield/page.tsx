import type { Metadata } from "next";
import { UnshieldView } from "@/components/console/views";

export const metadata: Metadata = { title: "Unshield" };

export default function UnshieldPage() {
  return (
    <main id="main">
      <UnshieldView />
    </main>
  );
}
