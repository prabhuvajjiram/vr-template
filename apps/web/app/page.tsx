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
import { getSiteUrl } from "./site-url";

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
    firstLine: "Omer",
    lastLine: "Akmal",
    role: "Board-certified periodontist and implant dentist",
    imageUrl: "/images/dr-omer-akmal.jpg",
    position: "right center",
    summary:
      "Dr. Akmal brings periodontal and implant surgery training together with a psychology background, helping anxious patients understand gum disease, surgical options, and prevention.",
    credentials: [
      "DDS, Baltimore College of Dental Surgery",
      "Advanced Education in General Dentistry",
      "Periodontics and implant surgery training, University of Pittsburgh"
    ]
  },
  {
    name: "Dr. Anna Bruhn",
    firstLine: "Anna",
    lastLine: "Bruhn",
    role: "Family and restorative dentist",
    imageUrl: "/images/dr-anna-bruhn.jpg",
    position: "center",
    summary:
      "Dr. Bruhn provides comprehensive general dentistry with a focus on comfort, clear explanations, and long-term patient relationships.",
    credentials: [
      "DMD, Columbia University College of Dental Medicine",
      "General practice residency, Baltimore VA Hospital",
      "Training in extractions, root canals, crowns, and bridgework"
    ]
  }
];

const siteUrl = getSiteUrl();

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: practiceProfile.name,
  url: siteUrl,
  telephone: practiceProfile.phoneDisplay,
  image: `${siteUrl}/images/dr-omer-akmal.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "915 N Quincy St",
    addressLocality: "Arlington",
    addressRegion: "VA",
    postalCode: "22203",
    addressCountry: "US"
  },
  openingHours: "Mo-Fr 08:00-16:00",
  medicalSpecialty: ["Dentistry", "Periodontics", "Dental Implants", "Cosmetic Dentistry"],
  areaServed: ["Arlington VA", "Ballston", "Clarendon", "Virginia Square"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Dental services",
    itemListElement: dentalServices.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "MedicalProcedure",
        name: service.name,
        description: service.summary
      }
    }))
  }
};

export default function HomePage() {
  return (
    <>
      <Header practice={practiceProfile} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <main>
        <Hero practice={practiceProfile} />
        <ServicesExplorer services={dentalServices} />
        <section className="section care-directory" aria-labelledby="care-directory-title">
          <div className="section-heading">
            <span>Service directory</span>
            <h2 id="care-directory-title">Detailed dental care in one Arlington office.</h2>
            <p>
              Explore routine visits, cosmetic goals, gum concerns, dental implants, urgent needs,
              and related treatment topics before you call or request a visit.
            </p>
          </div>
          <div className="care-directory-grid">
            {dentalServices.map((service) => (
              <article key={service.id}>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <ul>
                  {service.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <section className="section about-section" id="about">
          <div>
            <span>About Virginia Dental Care</span>
            <h2>Preventive, surgical, cosmetic, and family dentistry for Arlington.</h2>
          </div>
          <div className="about-copy">
            <p>
              Virginia Dental Care has served the Arlington community for more than a decade as a
              family dental clinic with both general dentistry and surgical periodontal support in
              the same practice.
            </p>
            <p>
              The care philosophy is prevention first: explain dental disease clearly, catch smaller
              problems early, and help patients feel comfortable enough to stay engaged in their
              treatment decisions.
            </p>
            <div className="about-points">
              <span>General dentistry</span>
              <span>Cosmetic dentistry</span>
              <span>Orthodontic options</span>
              <span>Periodontics</span>
              <span>Endodontics</span>
              <span>Oral surgery</span>
              <span>Dental implants</span>
            </div>
          </div>
        </section>
        <section className="section doctors-section" id="doctors">
          <div className="section-heading">
            <h2>The doctors at Virginia Dental Care.</h2>
            <p>
              Learn who provides your care, where each doctor focuses, and which visits may need
              general dentistry, periodontal, implant, or restorative support.
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
                  <span className="doctor-role">{doctor.role}</span>
                  <h3>
                    <span>{doctor.firstLine}</span>
                    <span>{doctor.lastLine}</span>
                  </h3>
                  <p>{doctor.summary}</p>
                  <ul>
                    {doctor.credentials.map((credential) => (
                      <li key={credential}>{credential}</li>
                    ))}
                  </ul>
                  <a className="text-link doctor-cta" href="/our-team">
                    Read the doctor profile <ArrowRight size={17} />
                  </a>
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
        <BookingWidget services={dentalServices} practice={practiceProfile} />
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
