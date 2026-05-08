"use client";

import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import type { BookingRequestResult, DentalService, DentalServiceId, PracticeProfile } from "@vadentalcare/shared";

type BookingWidgetProps = {
  services: DentalService[];
  practice: PracticeProfile;
};

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  schedulingNote: string;
  isNewPatient: boolean;
};

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiEnabled = Boolean(apiBase);

export function BookingWidget({ services, practice }: BookingWidgetProps) {
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
    schedulingNote: "",
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
      const response = await fetch(`${apiBase}/api/booking/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`Booking request failed: ${response.status}`);
      }
      setResult((await response.json()) as BookingRequestResult);
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
          Choose a care path, then continue through the current secure booking workflow or call the
          office. Do not include symptoms, diagnoses, insurance details, or medical history in this
          preview.
        </p>
      </div>

      <div className="booking-grid">
        <aside className="booking-summary">
          <CalendarDays size={30} />
          <h3>{apiEnabled ? activeService.name : "Appointment requests"}</h3>
          <p>
            {apiEnabled
              ? activeService.summary
              : "Use the current online booking workflow or call the office directly. The production VPS version can enable API-backed requests after HIPAA controls are in place."}
          </p>
          <dl>
            <div>
              <dt>{apiEnabled ? "Duration" : "Current workflow"}</dt>
              <dd>{apiEnabled ? `${activeService.durationMinutes} minutes` : "Existing booking link"}</dd>
            </div>
            <div>
              <dt>{apiEnabled ? "Office routing" : "Phone support"}</dt>
              <dd>{apiEnabled ? (activeService.urgency === "urgent" ? "Urgent triage" : "Standard care team") : practice.phoneDisplay}</dd>
            </div>
            <div>
              <dt>Confirmation</dt>
              <dd>Pending until the office confirms the exact time</dd>
            </div>
          </dl>
        </aside>

        {apiBase ? (
          <form className="booking-form" name="appointment-request" method="POST" onSubmit={submitBooking}>
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
              Scheduling note, optional
              <textarea
                name="schedulingNote"
                value={form.schedulingNote}
                onChange={(event) => setForm((value) => ({ ...value, schedulingNote: event.target.value }))}
                rows={3}
                maxLength={240}
                placeholder="Example: mornings are best. Do not include symptoms, diagnosis, insurance, or medical details here."
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

            <p className="notice">This form should only be enabled when the API, database, hosting, and vendors are covered by HIPAA policies and BAAs.</p>

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
        ) : (
          <div className="booking-form booking-handoff">
            <h3>Use the current secure booking workflow.</h3>
            <p>
              This preview avoids storing patient-identifiable appointment requests. For now,
              patients should continue through Virginia Dental Care's existing booking system or
              call the office directly.
            </p>
            <div className="handoff-actions">
              <a className="btn btn-primary" href={practice.bookingUrl}>
                <CalendarDays size={18} />
                Book online
              </a>
              <a className="btn btn-secondary" href={`tel:${practice.phoneE164}`}>
                Call {practice.phoneDisplay}
              </a>
            </div>
            <p className="notice">
              Production VPS version: enable this form only after the API, database, backups,
              logging, and any vendors are covered by the practice's HIPAA program and BAA review.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
