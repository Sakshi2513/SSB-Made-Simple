"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

declare global {
  interface Window {
    Razorpay?: new (o: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (r: { error?: { description?: string } }) => void) => void };
  }
}

function loadCheckout(): Promise<boolean> {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

// Opens Razorpay Checkout for a product. Needs a logged-in user; unlocks access via /api/payments/verify.
export default function BuyButton({ productId, label = "Buy now", className = "", price }: { productId: string; label?: string; className?: string; price?: number }) {
  const { user } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  async function buy() {
    setMsg("");
    if (!user) {
      router.push("/login");
      return;
    }
    setBusy(true);
    try {
      const token = await auth?.currentUser?.getIdToken();
      const res = await fetch("/api/payments/order", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ productId }) });
      const order = await res.json();
      if (!res.ok) throw new Error(order.error || "Could not start the payment.");
      if (!(await loadCheckout()) || !window.Razorpay) throw new Error("Could not load the payment window. Check your connection.");

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "SSBMadeSimple",
        description: order.name,
        prefill: { name: user.displayName ?? "", email: user.email ?? "" },
        theme: { color: "#0c2556" },
        handler: async (r: Record<string, string>) => {
          const v = await fetch("/api/payments/verify", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${await auth?.currentUser?.getIdToken()}` }, body: JSON.stringify(r) });
          if (v.ok) router.push("/library?paid=1");
          else setMsg(((await v.json().catch(() => ({}))) as { error?: string }).error || "Payment received but unlocking is delayed. It will appear in My Library shortly, or contact us on WhatsApp.");
          setBusy(false);
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rzp.on("payment.failed", (e) => {
        setMsg(e.error?.description || "Payment failed. Please try again.");
        setBusy(false);
      });
      rzp.open();
    } catch (e) {
      setMsg((e as Error).message);
      setBusy(false);
    }
  }

  return (
    <div>
      <button onClick={buy} disabled={busy} className={className}>
        {busy ? <Loader2 size={18} className="animate-spin" /> : null}
        {busy ? "Please wait..." : label} {!busy && <ArrowRight size={16} />}
        {!busy && price ? <span className="sr-only"> for ₹{price}</span> : null}
      </button>
      {msg && <p role="alert" className="mt-2 text-xs font-semibold text-red-600">{msg}</p>}
    </div>
  );
}
