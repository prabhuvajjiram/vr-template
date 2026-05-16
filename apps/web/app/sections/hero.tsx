import { CalendarDays, MapPin, Phone, Search, Star } from "lucide-react";
import Image from "next/image";
import type { PracticeProfile } from "@vadentalcare/shared";

type HeroProps = {
  practice: PracticeProfile;
};

export function Hero({ practice }: HeroProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          <span>Virginia</span>
          <span>Dental Care</span>
        </h1>
        <p>
          Doctor-led dentistry in Arlington with family care, periodontal specialty support,
          implant planning, cosmetic treatment, and urgent dental guidance in one office.
        </p>
        <div className="hero-actions">
          <a className="btn btn-secondary" href="#services">
            <Search size={18} />
            Find the care you need
          </a>
          <a className="btn btn-primary" href="#booking">
            <CalendarDays size={18} />
            Request appointment
          </a>
          <a className="hero-call-link" href={`tel:${practice.phoneE164}`}>
            <Phone size={18} />
            Call {practice.phoneDisplay}
          </a>
        </div>
        <div className="hero-review" aria-label="Patient review highlight">
          <Star size={18} />
          <span>Patients mention friendly staff, clear explanations, and visible pricing before treatment.</span>
        </div>
      </div>

      <div className="hero-media doctor-hero" aria-label="Virginia Dental Care doctors">
        <figure className="hero-doctor">
          <Image
            src="/images/dr-omer-akmal.jpg"
            alt="Dr. Omer Akmal"
            width={430}
            height={600}
            sizes="(max-width: 720px) 100vw, (max-width: 900px) 50vw, 24vw"
            priority
          />
          <figcaption>
            <strong>Dr. Omer Akmal</strong>
            <span>Periodontics and implants</span>
          </figcaption>
        </figure>
        <figure className="hero-doctor">
          <Image
            src="/images/dr-anna-bruhn.jpg"
            alt="Dr. Anna Bruhn"
            width={430}
            height={600}
            sizes="(max-width: 720px) 100vw, (max-width: 900px) 50vw, 24vw"
            priority
          />
          <figcaption>
            <strong>Dr. Anna Bruhn</strong>
            <span>Family and restorative dentistry</span>
          </figcaption>
        </figure>
      </div>

      <aside className="hero-panel" aria-label="Practice snapshot">
        <div>
          <MapPin size={20} />
          <span>{practice.addressLines.join(", ")}</span>
        </div>
        <div>
          <CalendarDays size={20} />
          <span>{practice.hours[0].replace("Monday-Friday", "Mon-Fri")}</span>
        </div>
        <div>
          <Phone size={20} />
          <span>New patients welcome</span>
        </div>
      </aside>
    </section>
  );
}
