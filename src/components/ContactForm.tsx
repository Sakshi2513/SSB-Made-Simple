"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";

// Temporary: opens the visitor's email app. Replaced with a real backend form in a later stage.
export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  }

  const field = "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm";

  return (
    <form onSubmit={submit} className="card space-y-4">
      <h2 className="font-display text-2xl font-semibold">Send a message</h2>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Your name
        </label>
        <input id="name" required value={name} onChange={(e) => setName(e.target.value)} className={field} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea id="message" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className={field} />
      </div>
      <button type="submit" className="btn-primary">
        Send
      </button>
    </form>
  );
}
