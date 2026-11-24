"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { collection, limit, onSnapshot, orderBy, query, type Timestamp } from "firebase/firestore";
import { Home, Target, ClipboardList, Bell, User } from "lucide-react";
import { mobileTabs } from "@/config/site";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { SEEN_KEY } from "./NotificationsList";

const icons = { home: Home, target: Target, clipboard: ClipboardList, bell: Bell, user: User };

function readSeen() {
  try {
    return Number(localStorage.getItem(SEEN_KEY) ?? 0);
  } catch {
    return 0;
  }
}

export default function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [latest, setLatest] = useState(0);
  const [seen, setSeen] = useState(0);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, "notifications"), orderBy("createdAt", "desc"), limit(1));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setLatest((snap.docs[0]?.data().createdAt as Timestamp | null)?.toMillis?.() ?? 0);
        setSeen(readSeen());
      },
      () => {},
    );
    const onSeen = () => setSeen(readSeen());
    window.addEventListener("notif-seen", onSeen);
    return () => {
      unsub();
      window.removeEventListener("notif-seen", onSeen);
    };
  }, []);

  const unread = latest > seen;

  return (
    <nav
      aria-label="Bottom navigation"
      className="print:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-5">
        {mobileTabs.map((tab) => {
          const t = tab.href === "/login" && user ? { ...tab, href: "/dashboard" } : tab;
          const Icon = icons[t.icon];
          const active = t.href === "/" ? pathname === "/" : pathname.startsWith(t.href);
          const showDot = t.href === "/notifications" && unread && !active;
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${active ? "text-gold" : "text-white/60"}`}
              >
                <span className="relative">
                  <Icon size={20} strokeWidth={active ? 2.6 : 2} />
                  {showDot && <span aria-label="New notifications" className="absolute -right-1 -top-0.5 h-2.5 w-2.5 rounded-full bg-saffron" />}
                </span>
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
