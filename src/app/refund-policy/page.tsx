import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Refund Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Refund Policy"
      sections={[
        { heading: "Digital products", body: "Courses and subscriptions are digital products delivered instantly after payment. Because access is granted immediately, payments are generally non-refundable." },
        { heading: "Exceptions", body: "If you were charged twice, or paid but did not receive access, contact us and we will resolve it or refund the amount." },
        { heading: "Book purchases", body: "Books are sold on Flipkart. Returns and refunds for book orders are governed by Flipkart's policy." },
        { heading: "How to request", body: `Email ${siteConfig.contact.email} with your registered email and payment ID. Approved refunds are returned to the original payment method within 5-7 working days.` },
      ]}
    />
  );
}
