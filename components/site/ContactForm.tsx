"use client";

import { useState, type FormEvent } from "react";

const INTEREST_OPTIONS = [
  "AI training for our leadership team",
  "Implementation help for a Claude / AI rollout",
  "Operational modernization for our business",
  "Succession or next-gen transition",
  "Family-business backing (Pertama Capital)",
  "Early-stage backing (Pertama Ventures)",
  "Something else",
] as const;

export function ContactForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [interest, setInterest] = useState<string>(INTEREST_OPTIONS[0]);
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `Intro — ${name || "(name)"} / ${company || "(company)"}`;
    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Role: ${role}`,
      `Interest: ${interest}`,
      "",
      "Context:",
      message,
    ].join("\n");
    const url = `mailto:michael@pertamapartners.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-lg border border-border bg-subtle p-6 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="Your name"
          value={name}
          onChange={setName}
          required
          autoComplete="name"
        />
        <Field
          label="Company"
          value={company}
          onChange={setCompany}
          required
          autoComplete="organization"
        />
      </div>
      <Field
        label="Your role"
        value={role}
        onChange={setRole}
        autoComplete="organization-title"
      />
      <div>
        <label className="block text-sm font-medium text-foreground">
          What are you exploring?
        </label>
        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-foreground focus:outline-none"
        >
          {INTEREST_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground">
          A few lines of context
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          required
          placeholder="What you're trying to do, what's prompting this, anything else useful for our first conversation."
          className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/70 focus:border-foreground focus:outline-none"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <p className="text-xs text-muted">
          Submitting opens your email client with the message ready to send.
        </p>
        <button
          type="submit"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-muted"
        >
          Compose email
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:border-foreground focus:outline-none"
      />
    </div>
  );
}
