import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        { heading: "Information we collect", body: "When you create an account we collect your name, email address and, optionally, phone number and target exam. We also store your test results and progress so you can track your preparation." },
        { heading: "How we use it", body: "We use your information to provide the service, show your progress, send notifications you opt in to, and process payments. We do not sell your personal data." },
        { heading: "Payments", body: "Payments are processed by Razorpay. We do not store your card or bank details." },
        { heading: "Third-party services", body: "We use Firebase for authentication, data storage and notifications, and analytics tools to improve the service." },
        { heading: "Your rights", body: `You can request access to, correction of, or deletion of your data at any time by contacting ${siteConfig.contact.email}.` },
        { heading: "Children", body: "The service is intended for users aged 13 and above. Users under 18 should use it with parental guidance." },
        { heading: "Contact", body: `Questions about this policy: ${siteConfig.contact.email}.` },
      ]}
    />
  );
}
