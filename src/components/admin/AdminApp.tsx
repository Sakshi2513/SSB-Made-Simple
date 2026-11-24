"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, BookOpen, ClipboardCheck, CreditCard, Crown, HeartPulse, Package, Flag, Download, ExternalLink, FileText, HelpCircle, LayoutDashboard, Settings, ShieldCheck, Users } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Overview from "./Overview";
import ArticleAdmin from "./ArticleAdmin";
import NoticesAdmin from "./NoticesAdmin";
import DownloadsAdmin from "./DownloadsAdmin";
import QuestionsAdmin from "./QuestionsAdmin";
import UsersAdmin from "./UsersAdmin";
import ResultsAdmin from "./ResultsAdmin";
import SettingsAdmin from "./SettingsAdmin";
import ProductsAdmin from "./ProductsAdmin";
import PremiumAdmin from "./PremiumAdmin";
import PaymentsAdmin from "./PaymentsAdmin";
import ReportsAdmin from "./ReportsAdmin";
import HealthAdmin from "./HealthAdmin";

const groups = [
  { name: "Overview", items: [{ id: "overview", label: "Dashboard", Icon: LayoutDashboard }] },
  {
    name: "Content",
    items: [
      { id: "posts", label: "Blog posts", Icon: FileText },
      { id: "materials", label: "Study guides", Icon: BookOpen },
      { id: "downloads", label: "Downloads", Icon: Download },
      { id: "questions", label: "Test questions", Icon: HelpCircle },
      { id: "health", label: "Content health", Icon: HeartPulse },
      { id: "reports", label: "Error reports", Icon: Flag },
    ],
  },
  {
    name: "Sales",
    items: [
      { id: "products", label: "Products & prices", Icon: Package },
      { id: "premium", label: "Premium content", Icon: Crown },
      { id: "payments", label: "Payments", Icon: CreditCard },
    ],
  },
  {
    name: "Engage",
    items: [{ id: "notices", label: "Notifications", Icon: Bell }],
  },
  {
    name: "People",
    items: [
      { id: "users", label: "Users", Icon: Users },
      { id: "results", label: "Test results", Icon: ClipboardCheck },
    ],
  },
  { name: "Site", items: [{ id: "settings", label: "Settings", Icon: Settings }] },
];
const all = groups.flatMap((g) => g.items);

export default function AdminApp() {
  const { user, role, loading, configured } = useAuth();
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.slice(1);
      if (all.some((i) => i.id === h)) setTab(h);
    };
    queueMicrotask(sync);
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const go = (id: string) => {
    setTab(id);
    history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: 0 });
  };

  const box = "mx-auto max-w-xl rounded-3xl border border-[#dfe6f2] bg-white p-8 text-center shadow-[0_18px_40px_-28px_rgba(12,37,86,0.5)]";

  if (!configured) return <div className={box}>Firebase is not configured for this site.</div>;
  if (loading) return <p className="py-20 text-center text-[#6b7589]">Loading...</p>;
  if (!user)
    return (
      <div className={box}>
        <h2 className="text-xl font-black text-[#0c2556]">Admin login required</h2>
        <p className="mt-2 text-[#4d5b76]">Log in with your admin account to continue.</p>
        <Link href="/login" className="btn-gold btn-shine mt-5">Go to login</Link>
      </div>
    );
  if (role !== "admin")
    return (
      <div className={box}>
        <ShieldCheck className="mx-auto text-[#1c4cb0]" size={34} />
        <h2 className="mt-3 text-xl font-black text-[#0c2556]">This account is not an admin</h2>
        <p className="mt-2 text-sm text-[#4d5b76]">
          In Firebase Console, open Firestore, then the <code>users</code> collection, then the document with the ID below, and set the field <code>role</code> to <code>admin</code>. Then log out and back in.
        </p>
        <p className="mt-3 break-all rounded-lg bg-[#f3f6fc] p-2 font-mono text-xs text-[#0c2556]">{user.uid}</p>
      </div>
    );

  const current = all.find((i) => i.id === tab) ?? all[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[15rem_1fr]">
      {/* sidebar (desktop) / scrolling tabs (mobile) */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <nav aria-label="Admin sections" className="hidden rounded-3xl bg-gradient-to-b from-[#0c2556] to-[#08142e] p-3 text-white shadow-[0_24px_50px_-28px_rgba(12,37,86,0.9)] lg:block">
          {groups.map((g) => (
            <div key={g.name} className="mb-2">
              <p className="px-3 pb-1 pt-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/45">{g.name}</p>
              {g.items.map(({ id, label, Icon }) => (
                <button key={id} onClick={() => go(id)} aria-current={tab === id} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition ${tab === id ? "bg-gold text-[#0c2556] shadow-lg" : "text-white/80 hover:bg-white/10"}`}>
                  <Icon size={17} /> {label}
                </button>
              ))}
            </div>
          ))}
          <Link href="/" target="_blank" className="mt-1 flex items-center gap-2 border-t border-white/10 px-3 pt-3 text-xs font-bold text-white/60 hover:text-gold">
            <ExternalLink size={14} /> View live site
          </Link>
        </nav>
        <div className="flex gap-2 overflow-x-auto rounded-2xl border border-[#dfe6f2] bg-white p-1.5 lg:hidden">
          {all.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => go(id)} aria-current={tab === id} className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-bold ${tab === id ? "bg-[#0c2556] text-white" : "text-[#4d5b76]"}`}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>
      </aside>

      <div className="min-w-0">
        <h2 className="mb-5 flex items-center gap-3 text-2xl font-black text-[#0c2556]">
          <current.Icon size={24} className="text-[#1c4cb0]" /> {current.label}
        </h2>
        {tab === "overview" && <Overview go={go} />}
        {tab === "posts" && <ArticleAdmin kind="posts" />}
        {tab === "materials" && <ArticleAdmin kind="materials" />}
        {tab === "downloads" && <DownloadsAdmin />}
        {tab === "questions" && <QuestionsAdmin />}
        {tab === "notices" && <NoticesAdmin />}
        {tab === "users" && <UsersAdmin />}
        {tab === "results" && <ResultsAdmin />}
        {tab === "health" && <HealthAdmin go={go} />}
        {tab === "reports" && <ReportsAdmin />}
        {tab === "products" && <ProductsAdmin />}
        {tab === "premium" && <PremiumAdmin />}
        {tab === "payments" && <PaymentsAdmin />}
        {tab === "settings" && <SettingsAdmin />}
      </div>
    </div>
  );
}
