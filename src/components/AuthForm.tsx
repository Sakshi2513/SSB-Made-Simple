"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const exams = ["NDA", "CDS", "AFCAT", "TES", "NCC Special Entry", "Technical Graduate", "Other"];

function friendly(err: unknown) {
  const code = (err as { code?: string })?.code ?? "";
  if (code.includes("email-already-in-use")) return "This email is already registered. Try logging in.";
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found"))
    return "Incorrect email or password.";
  if (code.includes("weak-password")) return "Password must be at least 6 characters.";
  if (code.includes("invalid-email")) return "Please enter a valid email address.";
  if (code.includes("popup-closed")) return "Sign-in was cancelled.";
  if (code.includes("too-many-requests")) return "Too many attempts. Please try again later.";
  return (err as Error)?.message || "Something went wrong. Please try again.";
}

export default function AuthForm() {
  const { signIn, signUp, signInWithGoogle, resetPassword, configured } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [exam, setExam] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);

  async function run(fn: () => Promise<void>) {
    setError("");
    setInfo("");
    setBusy(true);
    try {
      await fn();
      router.push("/dashboard");
    } catch (e) {
      setError(friendly(e));
    } finally {
      setBusy(false);
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    run(() => (mode === "login" ? signIn(email, password) : signUp(name.trim(), email, password, exam.trim())));
  }

  async function forgot() {
    setError("");
    setInfo("");
    if (!email) return setError("Enter your email above first.");
    try {
      await resetPassword(email);
      setInfo("Password reset email sent. Check your inbox.");
    } catch (e) {
      setError(friendly(e));
    }
  }

  const field =
    "w-full rounded-xl border border-[#dfe6f2] bg-[#f6f8fc] py-3 pl-11 pr-3 text-sm font-medium text-[#0c2556] outline-none transition focus:border-[#1c4cb0] focus:bg-white focus:ring-4 focus:ring-[#1c4cb0]/15";
  const icon = "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7589]";
  const label = "mb-1.5 block text-sm font-bold text-[#0c2556]";

  if (!configured) {
    return (
      <div className="rounded-[2rem] bg-white p-8 text-sm text-[#6b7589]">
        Login is not available yet. Firebase has not been configured for this site.
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-white p-6 pt-8 text-[#0c2556] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] md:p-8">
      <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#3b9cff] via-gold to-[#ff8f1f]" aria-hidden="true" />
      <h2 className="text-2xl font-black">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
      <p className="mb-5 mt-1 text-sm text-[#6b7589]">
        {mode === "login" ? "Log in to continue your preparation." : "Join free and start practising."}
      </p>
      <div className="mb-6 grid grid-cols-2 rounded-xl bg-[#eef3fb] p-1 text-sm font-bold" role="tablist">
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`rounded-lg py-2.5 transition ${mode === m ? "bg-[#0c2556] text-white shadow" : "text-[#6b7589] hover:text-[#0c2556]"}`}
          >
            {m === "login" ? "Login" : "Sign up"}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === "signup" && (
          <>
            <div>
              <label htmlFor="name" className={label}>Full name</label>
              <div className="relative">
                <User size={18} className={icon} />
                <input id="name" required value={name} onChange={(e) => setName(e.target.value)} className={field} autoComplete="name" />
              </div>
            </div>
            <div>
              <label htmlFor="exam" className={label}>Target exam</label>
              <input
                id="exam"
                required
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                placeholder="e.g. NDA, CDS, AFCAT"
                className={`${field} !pl-4`}
              />
              <p className="mt-1.5 text-xs text-[#6b7589]">Type one or more exams, separated by commas, or tap to add:</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {exams.map((x) => {
                  const list = exam.split(",").map((v) => v.trim()).filter(Boolean);
                  const on = list.some((v) => v.toLowerCase() === x.toLowerCase());
                  return (
                    <button
                      key={x}
                      type="button"
                      onClick={() => setExam((on ? list.filter((v) => v.toLowerCase() !== x.toLowerCase()) : [...list, x]).join(", "))}
                      className={`rounded-full border px-3 py-1 text-xs font-bold transition ${on ? "border-[#0c2556] bg-[#0c2556] text-white" : "border-[#dfe6f2] bg-white text-[#4d5b76] hover:border-[#0c2556]"}`}
                    >
                      {x}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <div className="relative">
            <Mail size={18} className={icon} />
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="email" />
          </div>
        </div>
        <div>
          <label htmlFor="password" className={label}>Password</label>
          <div className="relative">
            <Lock size={18} className={icon} />
            <input
              id="password"
              type={show ? "text" : "password"}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${field} pr-12`}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7589] hover:text-[#0c2556]"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600">{error}</p>}
        {info && <p role="status" className="rounded-lg bg-[#e4f1dc] px-3 py-2 text-sm font-semibold text-[#3d6b24]">{info}</p>}

        <button type="submit" disabled={busy} className="btn-gold btn-shine w-full !py-3.5 disabled:opacity-60">
          {busy ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
        </button>
        {mode === "login" && (
          <button type="button" onClick={forgot} className="w-full text-sm font-bold text-[#1c4cb0] hover:underline">
            Forgot password?
          </button>
        )}
      </form>

      <div className="my-5 flex items-center gap-3 text-xs font-bold text-[#6b7589]">
        <span className="h-px flex-1 bg-[#dfe6f2]" /> OR <span className="h-px flex-1 bg-[#dfe6f2]" />
      </div>
      <button
        type="button"
        disabled={busy}
        onClick={() => run(signInWithGoogle)}
        className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-[#dfe6f2] bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-[#0c2556] transition hover:border-[#0c2556] disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-16.6z" />
          <path fill="#FBBC05" d="M10.5 28.7c-.5-1.4-.8-2.9-.8-4.7s.3-3.3.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
          <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
        </svg>
        Continue with Google
      </button>
    </div>
  );
}
