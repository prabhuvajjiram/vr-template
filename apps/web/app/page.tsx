import { dentalServices, practiceProfile } from "@vadentalcare/shared";
import { Header } from "./sections/header";
import { Hero } from "./sections/hero";
import { ServicesExplorer } from "./sections/services-explorer";
import { BookingWidget } from "./sections/booking-widget";
import { MobileAppSection } from "./sections/mobile-app-section";
import { LocationSection } from "./sections/location-section";
import { MobileBottomBar } from "./sections/mobile-bottom-bar";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const testimonials = [
  {
    author: "Jeff P.",
    quote: "Friendly staff, clean office, and treatment prices shown before care begins."
  },
  {
    author: "Pierce B.",
    quote: "My first appointment exceeded expectations. Everyone was friendly and clear."
  },
  {
    author: "Michael M.",
    quote: "Knowledgeable, efficient, friendly care from the clinical team and front desk."
  }
];

const doctors = [
  {
    name: "Dr. Omer Akmal",
    role: "Periodontist and implant dentist",
    imageUrl: "/images/dr-omer-akmal.jpg",
    position: "center",
    summary:
      "Specialty care for periodontal treatment and implant planning in the same Arlington office."
  },
  {
    name: "Dr. Anna Bruhn",
    role: "Family dentist",
    imageUrl: "/images/dr-anna-bruhn.jpg",
    position: "center",
    summary:
      "Calm general dentistry with time to explain treatment and keep the visit comfortable."
  }
];

export default function HomePage() {
  return (
    <>
      <Header practice={practiceProfile} />
      <main>
        <Hero practice={practiceProfile} />
        <ServicesExplorer services={dentalServices} />
        <section className="section doctors-section" id="doctors">
          <div className="section-heading">
            <h2>Meet your Arlington dentists.</h2>
            <p>
              Patients can see who they are visiting before they arrive, with specialty and family
              dental care available in one office.
            </p>
          </div>
          <div className="doctor-grid">
            {doctors.map((doctor) => (
              <article className="doctor-card" key={doctor.name}>
                <div className="doctor-photo">
                  <Image
                    src={doctor.imageUrl}
                    alt={`${doctor.name}, ${doctor.role}`}
                    width={430}
                    height={600}
                    sizes="(max-width: 900px) 100vw, 22vw"
                    style={{ objectPosition: doctor.position }}
                  />
                </div>
                <div className="doctor-copy">
                  <span>{doctor.role}</span>
                  <h3>{doctor.name}</h3>
                  <p>{doctor.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section first-visit-section" id="first-visit">
          <div className="visit-copy">
            <h2>Your first visit should feel clear from the start.</h2>
            <p>
              During the first visit, the team takes time to understand patient concerns, complete a
              comprehensive intraoral exam, include oral cancer screening, take any needed X-rays,
              and explain treatment options clearly.
            </p>
            <a className="text-link" href="#booking">
              Request a new patient visit <ArrowRight size={17} />
            </a>
          </div>
          <div className="visit-steps" aria-label="First visit steps">
            <article>
              <span>01</span>
              <strong>Discuss concerns</strong>
              <p>Start with what brought the patient in and what outcome they want.</p>
            </article>
            <article>
              <span>02</span>
              <strong>Complete the exam</strong>
              <p>Use screening and X-rays when needed to support diagnosis.</p>
            </article>
            <article>
              <span>03</span>
              <strong>Review options</strong>
              <p>Explain routine cleaning or the next consultation if treatment is complex.</p>
            </article>
          </div>
        </section>
        <BookingWidget services={dentalServices} />
        <MobileAppSection />
        <section className="section testimonials" id="testimonials">
          <div className="section-heading">
            <h2>Patients describe a friendly, clear visit.</h2>
            <p>
              Reviews highlight a clean office, helpful staff, clear pricing, and treatment options
              explained before care begins.
            </p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.author}>
                <div className="stars" aria-label="5 star review">
                  ★★★★★
                </div>
                <blockquote>{testimonial.quote}</blockquote>
                <figcaption>{testimonial.author}</figcaption>
              </figure>
            ))}
          </div>
        </section>
        <LocationSection practice={practiceProfile} />
      </main>
      <MobileBottomBar practice={practiceProfile} />
    </>
  );
}
