import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import AdminApp from "@/components/admin/AdminApp";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminPage() {
  return (
    <>
      <PageHero title="Admin Panel" eyebrow="Admin" subtitle="Manage blog posts, notifications, downloads and practice test questions." />
      <section className="bg-[#f3f6fc]">
        <div className="container-x py-10">
          <AdminApp />
        </div>
      </section>
    </>
  );
}
