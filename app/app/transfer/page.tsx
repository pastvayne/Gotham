import type { Metadata } from "next";
import { TransferView } from "@/components/console/views";

export const metadata: Metadata = { title: "Private transfer" };

export default function TransferPage() {
  return (
    <main id="main">
      <TransferView />
    </main>
  );
}
