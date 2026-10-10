import { ArrowRight, Check, Copy, MailCheck, Pencil } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { demoSubject, site } from "../../config/site";
import { plans } from "../../content/plans";
import {
  demoEmailBody,
  demoMailto,
  emptyDemoRequest,
  MESSAGE_MAX,
  todayKey,
  validateDemoRequest,
  type DemoErrors,
  type DemoRequest,
} from "./demo-request";

type Field = { key: keyof DemoRequest; label: string; type: string; autoComplete?: string; placeholder?: string; full?: boolean; optional?: boolean; hint?: string };

const fields: Field[] = [
  { key: "name", label: "Full name", type: "text", autoComplete: "name", placeholder: "Your name" },
  { key: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@restaurant.com" },
  { key: "business", label: "Restaurant / business name", type: "text", autoComplete: "organization", placeholder: "e.g. The Corner Bistro" },
  { key: "phone", label: "Phone / WhatsApp", type: "tel", autoComplete: "tel", placeholder: "+1 555 010 0000", hint: "Include your country code." },
  { key: "date", label: "Preferred date", type: "date" },
  { key: "time", label: "Preferred time", type: "time" },
];

export function DemoForm() {
  const [params] = useSearchParams();
  const [plan, setPlan] = useState<string>();

  const [values, setValues] = useState<DemoRequest>(emptyDemoRequest);
  const [errors, setErrors] = useState<DemoErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  // Browser-only values are set after mount so the prerendered HTML and first client render match.
  const [today, setToday] = useState<string>();
  const [timezone, setTimezone] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // Read after mount: the page is prerendered without a query string.
  useEffect(() => {
    const planParam = params.get("plan");
    setPlan(plans.some((p) => p.name === planParam) ? planParam! : undefined);
  }, [params]);

  useEffect(() => {
    setToday(todayKey());
    try {
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    } catch {
      /* leave undefined */
    }
  }, []);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  const request: DemoRequest = { ...values, plan, timezone };

  const onChange = (key: keyof DemoRequest) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (submitted) setErrors(validateDemoRequest({ ...next, plan, timezone }, today));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateDemoRequest(request, today);
    setErrors(errs);
    const first = fields.map((f) => f.key).concat("message").find((k) => errs[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    window.location.href = demoMailto(request);
    setSent(true);
  };

  const copyDetails = async () => {
    const text = `To: ${site.email}\nSubject: ${demoSubject}\n\n${demoEmailBody(request)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  if (sent) {
    return (
      <div className="form-card form-success" ref={successRef} tabIndex={-1} aria-live="polite">
        <div className="form-success__icon">
          <MailCheck aria-hidden="true" />
        </div>
        <h2>Your request is ready to send</h2>
        <p>
          We've opened your email app with your demo request filled in. <strong>Please press Send</strong> to deliver it — nothing is sent or
          booked until you do.
        </p>
        <ol>
          <li>Send the email to {site.email}.</li>
          <li>We reply by email to confirm a time that suits you.</li>
          <li>You get a walkthrough tailored to {values.business.trim() || "your restaurant"}.</li>
        </ol>
        <p className="form-note">
          Email app didn't open? Copy the details and send them to{" "}
          <a className="inline-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          from any email account.
        </p>
        <div className="form-success__actions">
          <a href={demoMailto(request)} className="btn btn--primary">
            Open email again <ArrowRight className="arrow" aria-hidden="true" />
          </a>
          <button type="button" className="btn btn--ghost" onClick={copyDetails}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? "Copied" : "Copy details"}
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
            <Pencil aria-hidden="true" />
            Edit request
          </button>
        </div>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} className="form-card" onSubmit={onSubmit} noValidate aria-labelledby="demo-form-title">
      <h2 id="demo-form-title">Request your free demo</h2>
      <p>
        Fill in your details and we'll prepare an email for you to send. {plan && <>You're interested in the <strong>{plan}</strong> plan.</>}
      </p>

      {submitted && errorCount > 0 && (
        <p className="field__error" role="alert" style={{ marginBottom: 18 }}>
          Please fix {errorCount === 1 ? "the highlighted field" : `the ${errorCount} highlighted fields`} below.
        </p>
      )}

      <div className="form-grid">
        {fields.map((f) => {
          const err = errors[f.key];
          const id = `demo-${f.key}`;
          const hasHint = !err && (!!f.hint || (f.key === "time" && !!timezone));
          const describedBy = err ? `${id}-error` : hasHint ? `${id}-hint` : undefined;
          return (
            <div className={`field ${f.full ? "field--full" : ""}`} key={f.key} data-invalid={!!err}>
              <label htmlFor={id}>{f.label}</label>
              <input
                id={id}
                name={f.key}
                type={f.type}
                value={values[f.key] ?? ""}
                onChange={onChange(f.key)}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                required
                min={f.type === "date" ? today : undefined}
                aria-invalid={!!err}
                aria-describedby={describedBy}
              />
              {f.key === "time" && !err && timezone && (
                <span className="field__hint" id={`${id}-hint`}>
                  Your local time ({timezone}).
                </span>
              )}
              {f.hint && !err && (
                <span className="field__hint" id={`${id}-hint`}>
                  {f.hint}
                </span>
              )}
              {err && (
                <span className="field__error" id={`${id}-error`}>
                  {err}
                </span>
              )}
            </div>
          );
        })}

        <div className="field field--full" data-invalid={!!errors.message}>
          <label htmlFor="demo-message">
            Message <span className="opt">(optional)</span>
          </label>
          <textarea
            id="demo-message"
            name="message"
            value={values.message}
            onChange={onChange("message")}
            maxLength={MESSAGE_MAX + 200}
            placeholder="Tell us about your restaurant: number of branches, delivery or dine-in, anything you'd like to see."
            aria-invalid={!!errors.message}
            aria-describedby="demo-message-hint"
          />
          <span className={errors.message ? "field__error" : "field__hint"} id="demo-message-hint">
            {errors.message ?? `${values.message.length}/${MESSAGE_MAX}`}
          </span>
        </div>
      </div>

      <div className="form-footer">
        <button type="submit" className="btn btn--primary btn--block">
          Send demo request <ArrowRight className="arrow" aria-hidden="true" />
        </button>
        <p className="form-note">
          Submitting opens your email app with a message to{" "}
          <a className="inline-link" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          — review it and press Send. Your preferred time is a request; we'll confirm the final time by email.
        </p>
      </div>
    </form>
  );
}
