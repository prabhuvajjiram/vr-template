import { CalendarDays, MapPin, Phone } from "lucide-react";
import type { PracticeProfile } from "@vadentalcare/shared";

type LocationSectionProps = {
  practice: PracticeProfile;
};

export function LocationSection({ practice }: LocationSectionProps) {
  return (
    <section className="section location-section" id="location">
      <div className="location-copy">
        <h2>Visit Virginia Dental Care in Arlington.</h2>
        <p>
          Find the office, call the team, and check regular hours before you request a visit.
        </p>
        <div className="contact-list">
          <a href={practice.mapUrl}>
            <MapPin size={20} />
            <span>{practice.addressLines.join(", ")}</span>
          </a>
          <a href={`tel:${practice.phoneE164}`}>
            <Phone size={20} />
            <span>{practice.phoneDisplay}</span>
          </a>
          <div>
            <CalendarDays size={20} />
            <span>{practice.hours.join(" · ")}</span>
          </div>
        </div>
      </div>
      <div className="map-panel">
        <iframe
          title="Virginia Dental Care map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6211.515345335687!2d-77.10522880320866!3d38.88378573847664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b4267061589d%3A0x519b72eafc7f0112!2sVirginia%20Dental%20Care!5e0!3m2!1sen!2sba!4v1738253376433!5m2!1sen!2sba"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
