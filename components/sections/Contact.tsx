"use client";

import { useState, type FormEvent } from "react";
import Section from "@/components/ui/Section";
import { site } from "@/data/site";
import { contactSchema } from "@/lib/contact-schema";

// FormSubmit relays JSON posts to the site email with no account or API key.
// The first message triggers a one-time activation email to that inbox.
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? `https://formsubmit.co/ajax/${site.email}`;

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

export default function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ state: "submitting" });
    setFieldErrors({});

    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (typeof field === "string" && !errs[field]) errs[field] = issue.message;
      }
      setFieldErrors(errs);
      setStatus({ state: "error", message: "Please fix the highlighted fields." });
      return;
    }

    const { name, email, subject, message, website } = parsed.data;
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject: subject || "(no subject)",
          message,
          _subject: `Portfolio message from ${name}${subject ? `: ${subject}` : ""}`,
          _replyto: email,
          _template: "table",
          _captcha: "false",
          _honey: website
        })
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || !(json.success === true || json.success === "true")) {
        throw new Error("relay rejected");
      }
      setStatus({ state: "success" });
      form.reset();
    } catch {
      setStatus({
        state: "error",
        message: `Couldn't send. Email me directly at ${site.email} instead.`
      });
    }
  }

  return (
    <Section
      id="contact"
      number="07"
      title="Contact"
      intro={
        <>
          Email is fastest:{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
          . The form goes to the same inbox. I reply to everything that isn&apos;t spam, usually
          within a couple of days.
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="max-w-xl" aria-busy={status.state === "submitting"}>
        {/* Honeypot: visually hidden, bots tend to fill it. */}
        <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
          <label>
            Website (leave blank)
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Name" name="name" autoComplete="name" error={fieldErrors.name} />
          <Field label="Email" name="email" type="email" autoComplete="email" error={fieldErrors.email} />
        </div>
        <Field className="mt-6" label="Subject" name="subject" optional error={fieldErrors.subject} />
        <Field className="mt-6" label="Message" name="message" textarea error={fieldErrors.message} />

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button type="submit" disabled={status.state === "submitting"} className="btn-solid">
            {status.state === "submitting" ? "Sending…" : "Send"}
          </button>
          <p className="text-xs text-muted">No tracking, no mailing list.</p>
        </div>

        <div role="status" aria-live="polite" className="mt-4 text-sm">
          {status.state === "success" && (
            <p className="text-ink">Sent. Thanks; I&apos;ll get back to you.</p>
          )}
          {status.state === "error" && <p className="text-accent">{status.message}</p>}
        </div>
      </form>
    </Section>
  );
}

function Field({
  label,
  name,
  type = "text",
  optional,
  textarea,
  autoComplete,
  className,
  error
}: {
  label: string;
  name: string;
  type?: string;
  optional?: boolean;
  textarea?: boolean;
  autoComplete?: string;
  className?: string;
  error?: string;
}) {
  const id = `f-${name}`;
  const errId = `${id}-error`;
  return (
    <div className={className}>
      <label htmlFor={id} className="label flex items-baseline justify-between">
        <span>{label}</span>
        {optional && <span className="normal-case tracking-normal">optional</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          maxLength={4000}
          className="field mt-1 min-h-[7rem] resize-y"
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          maxLength={type === "email" ? 120 : 160}
          className="field mt-1"
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
        />
      )}
      {error && (
        <p id={errId} className="mt-1.5 text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
