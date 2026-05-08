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
          Comprehensive dental care in Arlington for preventive visits, cosmetic goals, gum health,
          implants, and urgent concerns.
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

      <div className="hero-media">
        <Image
          src="https://vadentalcare.com/wp-content/uploads/2025/01/portrait-smiling-young-woman-sitting-chair-dental-clinic-1.jpg"
          alt="Smiling dental patient in a treatment room"
          width={2000}
          height={1333}
          sizes="(max-width: 900px) 100vw, 48vw"
          priority
        />
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
