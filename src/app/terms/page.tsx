import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms of Use" };

export default function Page() {
  return (
    <LegalPage
      title="Terms of Use"
      sections={[
        { heading: "Acceptance", body: "By using this website or app you agree to these terms." },
        { heading: "Educational purpose", body: "All content is for educational guidance only. We do not guarantee selection in the SSB or any armed forces examination." },
        { heading: "No affiliation", body: "SSBMadeSimple is an independent platform and is not affiliated with, endorsed by, or connected to the Indian Armed Forces or any government body." },
        { heading: "Accounts", body: "You are responsible for keeping your login details secure and for all activity under your account." },
        { heading: "Intellectual property", body: "All content, including books, tests and articles, belongs to SSBMadeSimple. You may not copy, resell or redistribute it without written permission." },
        { heading: "Changes", body: "We may update these terms from time to time. Continued use means you accept the updated terms." },
      ]}
    />
  );
}
