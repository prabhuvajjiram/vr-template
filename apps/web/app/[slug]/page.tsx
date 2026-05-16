import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  carePages,
  findCarePageBySlug,
  findDentalService,
  practiceProfile
} from "@vadentalcare/shared";
import Image from "next/image";
import { Header } from "../sections/header";
import { LocationSection } from "../sections/location-section";
import { MobileBottomBar } from "../sections/mobile-bottom-bar";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const supportPages = {
  "about-us": {
    title: "About Virginia Dental Care",
    label: "About",
    description:
      "Virginia Dental Care is a family dental clinic serving Arlington with preventive, surgical, cosmetic, periodontal, endodontic, oral surgery, and implant care.",
    body: [
      "The practice combines comprehensive family dentistry with surgical periodontal support, helping patients address routine care, dental anxiety, gum health, missing teeth, and long-term treatment planning in one office.",
      "The care philosophy is prevention first: explain what is happening, catch small problems early, and help patients make informed treatment choices."
    ]
  },
  "our-team": {
    title: "Our Team",
    label: "Doctors",
    description:
      "Meet Dr. Omer Akmal, board-certified periodontist and implant dentist, and Dr. Anna Bruhn, family and restorative dentist in Arlington, VA.",
    body: [
      "Dr. Omer Akmal focuses on periodontics, implant surgery, gum care, surgical extractions, and patient education. His background includes psychology, advanced general dentistry, and periodontal surgical training.",
      "Dr. Anna Bruhn provides comprehensive general dentistry with experience in extractions, root canals, crowns, bridges, and patient-centered restorative care."
    ]
  },
  testimonials: {
    title: "Patient Testimonials",
    label: "Reviews",
    description:
      "Patients describe Virginia Dental Care as friendly, clear, professional, and transparent about treatment recommendations.",
    body: [
      "Reviews commonly mention friendly staff, a clean office, clear explanations, visible pricing before treatment, and care that helps patients feel comfortable.",
      "Many patients highlight the combination of general dentistry, periodontal care, and supportive front-office communication."
    ]
  },
  contact: {
    title: "Contact Virginia Dental Care",
    label: "Contact",
    description:
      "Contact Virginia Dental Care at 915 N Quincy St, Arlington, VA 22203 or call (703) 276-1010.",
    body: [
      "Virginia Dental Care is located at 915 N Quincy St in Arlington, VA 22203.",
      "Office hours are Monday through Friday, 8:00 AM to 4:00 PM. Saturday and Sunday are closed."
    ]
  }
} as const;

const teamProfiles = [
  {
    name: "Dr. Omer Akmal",
    firstLine: "Omer",
    lastLine: "Akmal",
    role: "Board-certified periodontist and implant dentist",
    imageUrl: "/images/dr-omer-akmal.jpg",
    position: "right center",
    summary:
      "Dr. Akmal focuses on periodontics, implant surgery, gum care, surgical extractions, and patient education. His psychology background and surgical training help patients understand complex treatment options clearly.",
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
      "Dr. Bruhn provides comprehensive general dentistry with experience in extractions, root canals, crowns, bridges, and patient-centered restorative care.",
    credentials: [
      "DMD, Columbia University College of Dental Medicine",
      "General practice residency, Baltimore VA Hospital",
      "Training in extractions, root canals, crowns, and bridgework"
    ]
  }
];

export function generateStaticParams() {
  return [
    ...carePages.map((page) => ({ slug: page.slug })),
    ...Object.keys(supportPages).map((slug) => ({ slug }))
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const carePage = findCarePageBySlug(slug);
  const supportPage = supportPages[slug as keyof typeof supportPages];

  if (carePage) {
    const service = findDentalService(carePage.serviceId);
    const title = `${carePage.title} in Arlington, VA`;
    return {
      title,
      description:
        carePage.type === "topic"
          ? `${carePage.title} is part of ${service.name} at Virginia Dental Care in Arlington, VA. Call ${practiceProfile.phoneDisplay} to request care.`
          : `${service.summary} Virginia Dental Care serves patients from Arlington, Ballston, Clarendon, and Virginia Square.`,
      alternates: {
        canonical: `/${carePage.slug}`
      }
    };
  }

  if (supportPage) {
    return {
      title: supportPage.title,
      description: supportPage.description,
      alternates: {
        canonical: `/${slug}`
      }
    };
  }

  return {};
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const carePage = findCarePageBySlug(slug);
  const supportPage = supportPages[slug as keyof typeof supportPages];

  if (!carePage && !supportPage) {
    notFound();
  }

  const service = carePage ? findDentalService(carePage.serviceId) : null;
  const pageTitle = carePage ? `${carePage.title} in Arlington, VA` : supportPage!.title;
  const label = carePage ? (carePage.type === "topic" ? service?.name : "Dental service") : supportPage!.label;

  return (
    <>
      <Header practice={practiceProfile} />
      <main>
        <section className="section content-page">
          <a className="text-link" href="/">
            Back to home
          </a>
          <span>{label}</span>
          <h1>{pageTitle}</h1>
          {carePage && service ? (
            <div className="content-layout">
              <article>
                <p>
                  {carePage.type === "topic"
                    ? `${carePage.title} is part of ${service.name} at Virginia Dental Care. The team can evaluate your needs, explain treatment options, and help route your visit to the right clinician.`
                    : service.summary}
                </p>
                <h2>Related care</h2>
                <ul>
                  {service.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
                <p>
                  For urgent pain, swelling, trauma, or infection concerns, call the office directly
                  so the team can triage timing and next steps.
                </p>
              </article>
              <aside>
                <strong>{practiceProfile.name}</strong>
                <span>{practiceProfile.addressLines.join(", ")}</span>
                <span>{practiceProfile.phoneDisplay}</span>
                <a className="btn btn-primary" href={practiceProfile.bookingUrl}>
                  Book online
                </a>
              </aside>
            </div>
          ) : slug === "our-team" ? (
            <div className="team-profile-list">
              {teamProfiles.map((doctor) => (
                <article className="doctor-card" key={doctor.name}>
                  <div className="doctor-photo">
                    <Image
                      src={doctor.imageUrl}
                      alt={`${doctor.name}, ${doctor.role}`}
                      width={430}
                      height={600}
                      sizes="(max-width: 900px) 100vw, 28vw"
                      style={{ objectPosition: doctor.position }}
                    />
                  </div>
                  <div className="doctor-copy">
                    <span className="doctor-role">{doctor.role}</span>
                    <h2>
                      <span>{doctor.firstLine}</span>
                      <span>{doctor.lastLine}</span>
                    </h2>
                    <p>{doctor.summary}</p>
                    <ul>
                      {doctor.credentials.map((credential) => (
                        <li key={credential}>{credential}</li>
                      ))}
                    </ul>
                    <a className="btn btn-primary doctor-cta" href="/#booking">
                      Request an appointment
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="content-layout">
              <article>
                {supportPage!.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
              <aside>
                <strong>{practiceProfile.name}</strong>
                <span>{practiceProfile.addressLines.join(", ")}</span>
                <span>{practiceProfile.hours.join(" · ")}</span>
                <a className="btn btn-primary" href={practiceProfile.bookingUrl}>
                  Book online
                </a>
              </aside>
            </div>
          )}
        </section>
        <LocationSection practice={practiceProfile} />
      </main>
      <MobileBottomBar practice={practiceProfile} />
    </>
  );
}
