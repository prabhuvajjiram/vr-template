import { CalendarCheck, ClipboardList, MapPinned, PhoneCall } from "lucide-react";

const portalSteps = [
  {
    icon: CalendarCheck,
    title: "Appointment requests",
    text: "Send your contact details, care need, and preferred timing for office confirmation."
  },
  {
    icon: PhoneCall,
    title: "Direct office contact",
    text: "Call the team quickly when symptoms are urgent or timing needs to change."
  },
  {
    icon: ClipboardList,
    title: "First-visit details",
    text: "Review what to expect before the visit so the appointment starts clearly."
  },
  {
    icon: MapPinned,
    title: "Directions and hours",
    text: "Keep the address, regular hours, map, and phone number close on mobile."
  }
];

export function MobileAppSection() {
  return (
    <section className="mobile-app-section" id="app">
      <div className="mobile-app-copy">
        <h2>Patient tools without extra searching.</h2>
        <p>
          The mobile experience should keep practical actions close: request an appointment, call
          the office, find directions, and review first-visit information.
        </p>
      </div>

      <div className="portal-plan" aria-label="Patient tools implementation plan">
        {portalSteps.map((step) => (
          <article key={step.title}>
            <step.icon size={24} />
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
