import type { Metadata } from "next";
import { ConsoleShell } from "@/components/console/shell";

export const metadata: Metadata = {
  title: {
    default: "Preview",
    template: "%s · Gotham",
  },
  description: "Gotham preview console. It can read a public testnet balance and cannot submit a transaction.",
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <ConsoleShell>{children}</ConsoleShell>;
}
