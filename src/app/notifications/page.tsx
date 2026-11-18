import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import NotificationsList from "@/components/NotificationsList";

export const metadata: Metadata = { title: "Notifications", description: "Announcements and updates from SSBMadeSimple." };

export default function NotificationsPage() {
  return (
    <>
      <PageHero image="page-notifications|lecturette" title="Notifications" subtitle="Announcements, new material and test updates." />
      <section className="container-x max-w-3xl py-12">
        <NotificationsList />
      </section>
    </>
  );
}
