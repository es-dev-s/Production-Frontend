"use client";

import { useState } from "react";
import { ScanText } from "lucide-react";
import { useUserStore } from "@/app/store/user-store";

export function LoginScreen() {
  const signIn = useUserStore((s) => s.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const result = await signIn(email, password);
    setBusy(false);
    if (result === "ok") return;
    if (result === "auth") {
      setError("Invalid email or password");
      return;
    }
    if (result === "disabled") {
      setError("This account is disabled.");
      return;
    }
    if (result === "rate") {
      setError("Too many attempts. Try again in a few minutes.");
      return;
    }
    setError("Couldn’t sign in. Try again.");
  };

  return (
    <div className="relative flex h-full min-h-0 w-full flex-1 items-center justify-center overflow-hidden bg-canvas p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(57,198,143,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(31,122,92,0.1),_transparent_45%)]"
      />
      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-[23rem] rounded-[1.5rem] border border-[var(--border)] bg-surface/95 p-7 shadow-[var(--shadow-elevated)] backdrop-blur-sm"
      >
        <div className="flex size-11 items-center justify-center rounded-2xl bg-accent text-white shadow-[0_8px_20px_rgba(57,198,143,0.35)]">
          <ScanText className="size-5" strokeWidth={1.75} absoluteStrokeWidth />
        </div>
        <p className="mt-4 text-[11px] font-semibold tracking-[0.1em] text-accent-deep uppercase">
          Web OCR
        </p>
        <h1 className="mt-1.5 text-[22px] font-semibold tracking-[-0.03em] text-ink">
          Sign in
        </h1>
        <p className="mt-1.5 text-[13px] leading-5 text-muted">
          Use your admin or member account.
        </p>
        <label className="mt-6 block">
          <span className="mb-1.5 block text-[12px] font-medium text-muted">Email</span>
          <input
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-10 w-full rounded-2xl border border-[var(--border)] bg-canvas px-3.5 text-[13px] text-ink outline-none placeholder:text-muted-soft transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]"
          />
        </label>
        <label className="mt-3.5 block">
          <span className="mb-1.5 block text-[12px] font-medium text-muted">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-10 w-full rounded-2xl border border-[var(--border)] bg-canvas px-3.5 text-[13px] text-ink outline-none transition-[border-color,box-shadow] focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]"
          />
        </label>
        <p className={`mt-2.5 h-4 text-[12px] ${error ? "text-red-600" : "text-transparent"}`}>
          {error || "placeholder"}
        </p>
        <button
          type="submit"
          disabled={busy}
          className="btn-primary mt-2 inline-flex h-10 w-full items-center justify-center rounded-2xl text-[13px] font-semibold tracking-[-0.01em]"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
