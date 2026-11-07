import type { Metadata } from "next";
import { SettingsView } from "@/components/console/views";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <main id="main">
      <SettingsView />
    </main>
  );
}
