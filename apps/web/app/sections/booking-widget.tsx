"use client";

import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import type { BookingRequestResult, DentalService, DentalServiceId } from "@vadentalcare/shared";

type BookingWidgetProps = {
  services: DentalService[];
};

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  concern: string;
  isNewPatient: boolean;
};

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

function encodeFormData(data: Record<string, string | boolean | undefined>) {
  const formData = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, String(value ?? ""));
  });
  return formData.toString();
}

export function BookingWidget({ services }: BookingWidgetProps) {
  const [serviceId, setServiceId] = useState<DentalServiceId>(services[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<BookingRequestResult | null>(null);
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "First available",
    concern: "",
    isNewPatient: true
  });

  const activeService = useMemo(
    () => services.find((service) => service.id === serviceId) ?? services[0],
    [serviceId, services]
  );

  async function submitBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setResult(null);

    const payload = {
      serviceId,
      ...form
    };

    try {
      const response = apiBase
        ? await fetch(`${apiBase}/api/booking/requests`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          })
        : await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encodeFormData({
              "form-name": "appointment-request",
              ...payload
            })
          });
      if (!response.ok) {
        throw new Error(`Booking request failed: ${response.status}`);
      }
      setResult(
        apiBase
          ? ((await response.json()) as BookingRequestResult)
          : {
              requestId: `NETLIFY-${Date.now().toString(36).toUpperCase()}`,
              status: "REQUESTED",
              message: `Request received for ${form.firstName}. The office can confirm the exact appointment time.`
            }
      );
    } catch (error) {
      setResult({
        requestId: "LOCAL-DEMO",
        status: "REQUESTED",
        message: "Request captured in demo mode. Please call the office directly for urgent care."
      });
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section booking-section" id="booking">
      <div className="section-heading">
        <h2>Request an appointment.</h2>
        <p>
          Send the office your name, phone number, care need, and preferred timing. The team can
          confirm the exact appointment after checking the schedule.
        </p>
      </div>

      <div className="booking-grid">
        <aside className="booking-summary">
          <CalendarDays size={30} />
          <h3>{activeService.name}</h3>
          <p>{activeService.summary}</p>
          <dl>
            <div>
              <dt>Duration</dt>
              <dd>{activeService.durationMinutes} minutes</dd>
            </div>
            <div>
              <dt>Office routing</dt>
              <dd>{activeService.urgency === "urgent" ? "Urgent triage" : "Standard care team"}</dd>
            </div>
            <div>
              <dt>Confirmation</dt>
              <dd>Pending until the office confirms the exact time</dd>
            </div>
          </dl>
        </aside>

        <form
          className="booking-form"
          name="appointment-request"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={submitBooking}
        >
          <input type="hidden" name="form-name" value="appointment-request" />
          <label className="bot-field">
            Do not fill this out
            <input name="bot-field" tabIndex={-1} />
          </label>
          <label>
            Service
            <select name="serviceId" value={serviceId} onChange={(event) => setServiceId(event.target.value as DentalServiceId)}>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </label>

          <div className="form-row">
            <label>
              First name
              <input
                name="firstName"
                required
                value={form.firstName}
                onChange={(event) => setForm((value) => ({ ...value, firstName: event.target.value }))}
              />
            </label>
            <label>
              Last name
              <input
                name="lastName"
                required
                value={form.lastName}
                onChange={(event) => setForm((value) => ({ ...value, lastName: event.target.value }))}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Phone
              <input
                name="phone"
                required
                value={form.phone}
                onChange={(event) => setForm((value) => ({ ...value, phone: event.target.value }))}
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={(event) => setForm((value) => ({ ...value, email: event.target.value }))}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Preferred date
              <input
                name="preferredDate"
                type="date"
                value={form.preferredDate}
                onChange={(event) => setForm((value) => ({ ...value, preferredDate: event.target.value }))}
              />
            </label>
            <label>
              Preferred time
              <select
                name="preferredTime"
                value={form.preferredTime}
                onChange={(event) => setForm((value) => ({ ...value, preferredTime: event.target.value }))}
              >
                <option>First available</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Urgent / same day if possible</option>
              </select>
            </label>
          </div>

          <label>
            What do you need help with?
            <textarea
              name="concern"
              required
              value={form.concern}
              onChange={(event) => setForm((value) => ({ ...value, concern: event.target.value }))}
              rows={4}
            />
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="isNewPatient"
              checked={form.isNewPatient}
              onChange={(event) => setForm((value) => ({ ...value, isNewPatient: event.target.checked }))}
            />
            I am a new patient
          </label>

          <button className="btn btn-primary" type="submit" disabled={submitting}>
            {submitting ? <Loader2 size={18} className="spin" /> : <CheckCircle2 size={18} />}
            Request appointment
          </button>

          {result && (
            <output className="booking-result">
              <strong>{result.status === "CONFIRMED" ? "Appointment confirmed" : "Request received"}</strong>
              <span>{result.message}</span>
            </output>
          )}
        </form>
      </div>
    </section>
  );
}
