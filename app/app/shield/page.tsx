import type { Metadata } from "next";
import { ShieldView } from "@/components/console/views";

export const metadata: Metadata = { title: "Shield" };

export default function ShieldPage() {
  return (
    <main id="main">
      <ShieldView />
    </main>
  );
}
