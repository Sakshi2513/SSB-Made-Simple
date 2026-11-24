import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ReceiptView from "@/components/ReceiptView";

export const metadata: Metadata = { title: "Payment receipt", robots: { index: false, follow: false } };

export default function ReceiptPage() {
  return (
    <>
      <div className="print:hidden"><PageHero title="Payment Receipt" eyebrow="Receipt" subtitle="Keep this for your records." /></div>
      <section className="bg-[#f3f6fc] print:bg-white">
        <div className="container-x py-10">
          <Suspense fallback={<p className="py-16 text-center text-[#6b7589]">Loading...</p>}>
            <ReceiptView />
          </Suspense>
        </div>
      </section>
    </>
  );
}
