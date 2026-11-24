"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import PageHero from "@/components/PageHero";
import RecentResults from "@/components/RecentResults";

type Profile = { name?: string; targetExam?: string };

export default function DashboardPage() {
  const { user, role, loading, signOut } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || !db) return;
    getDoc(doc(db, "users", user.uid))
      .then((s) => setProfile((s.data() as Profile) ?? {}))
      .catch(() => setProfile({}));
  }, [user]);

  if (loading || !user) {
    return <p className="container-x py-20 text-center text-muted">Loading...</p>;
  }

  const name = profile?.name || user.displayName || "Aspirant";

  return (
    <>
      <PageHero image="page-dashboard|command-task" title={`Welcome, ${name}`} subtitle="Your preparation dashboard." />
      <section className="container-x grid gap-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <h2 className="font-display text-xl font-semibold">Profile</h2>
          <p className="mt-2 text-sm text-muted">{user.email}</p>
          <p className="text-sm text-muted">Target exam: {profile?.targetExam || "Not set"}</p>
        </div>
        <div className="card">
          <h2 className="font-display text-xl font-semibold">Progress</h2>
          <div className="mt-2">
            <RecentResults uid={user.uid} />
          </div>
          <Link href="/practice-tests" className="btn-primary mt-3">Practice Tests</Link>
        </div>
        <div className="card">
          <h2 className="font-display text-xl font-semibold">My Library</h2>
          <p className="mt-2 text-sm text-muted">Premium packs, PDFs and classes you have unlocked.</p>
          <Link href="/library" className="btn-gold mt-3">Open library</Link>
        </div>
        <div className="card">
          <h2 className="font-display text-xl font-semibold">Continue learning</h2>
          <p className="mt-2 text-sm text-muted">Pick up where you left off.</p>
          <Link href="/ssb-tasks" className="btn-outline mt-3">SSB Tasks</Link>
        </div>
        {role === "admin" && (
          <Link href="/admin" className="card flex items-center justify-between gap-3 border-gold md:col-span-2 lg:col-span-4">
            <span><span className="block text-lg font-black">Admin panel</span><span className="text-sm text-muted">Manage posts, notifications, downloads and test questions.</span></span>
            <span className="btn-gold">Open admin</span>
          </Link>
        )}
        <button onClick={() => signOut().then(() => router.push("/"))} className="btn-outline md:col-span-2 lg:col-span-4 md:w-fit">
          Log out
        </button>
      </section>
    </>
  );
}
