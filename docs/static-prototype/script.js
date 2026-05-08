const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const serviceTabs = document.querySelectorAll(".service-tab");
const serviceTitle = document.querySelector("[data-service-title]");
const serviceDescription = document.querySelector("[data-service-description]");
const serviceImage = document.querySelector("[data-service-image]");
const serviceList = document.querySelector("[data-service-list]");
const serviceLink = document.querySelector("[data-service-link]");

const services = {
  general: {
    title: "General Dentistry",
    description:
      "Preventive cleanings, exams, X-rays, fillings, and long-term treatment planning presented with plain-language next steps.",
    image: "https://vadentalcare.com/wp-content/uploads/2025/01/generaldentistry_img.jpg",
    alt: "Patient receiving general dental care",
    href: "/general-dentistry/",
    link: "Explore General Dentistry",
    bullets: [
      "Routine cleaning and comprehensive exams",
      "Oral cancer screening and diagnostic X-rays",
      "Restorative care for everyday concerns",
    ],
  },
  cosmetic: {
    title: "Cosmetic Dentistry",
    description:
      "Smile-focused care for patients comparing whitening, bonding, veneers, and restorative cosmetic options.",
    image: "https://vadentalcare.com/wp-content/uploads/2025/01/cosmeticdentistry_img.jpg",
    alt: "Cosmetic dentistry smile consultation",
    href: "/cosmetic-dentistry/",
    link: "Explore Cosmetic Dentistry",
    bullets: ["Whitening and smile enhancement", "Natural-looking restorations", "Treatment planning around patient goals"],
  },
  periodontics: {
    title: "Periodontics",
    description:
      "Gum-health care explained in a way that helps patients understand diagnosis, maintenance, and next steps.",
    image: "https://vadentalcare.com/wp-content/uploads/2025/01/periodontalservices_img.jpg",
    alt: "Periodontal dental service equipment",
    href: "/periodontics/",
    link: "Explore Periodontics",
    bullets: ["Gum disease evaluation", "Deep cleaning care paths", "Maintenance plans for long-term health"],
  },
  implants: {
    title: "Implant Dentistry",
    description:
      "A cleaner implant pathway that answers the major patient questions: candidacy, timeline, cost, and recovery.",
    image: "https://vadentalcare.com/wp-content/uploads/2025/01/dental-implatns.jpg",
    alt: "Dental implant consultation",
    href: "/dental-implants/",
    link: "Explore Implant Dentistry",
    bullets: ["Implant consultations", "Replacement options for missing teeth", "Surgical and restorative coordination"],
  },
  emergency: {
    title: "Emergency Dentistry",
    description:
      "Fast, reassuring guidance for pain, swelling, chipped teeth, and urgent symptoms that need quick triage.",
    image: "https://vadentalcare.com/wp-content/uploads/2025/01/dentist-visit-1-1.jpg",
    alt: "Emergency dental consultation",
    href: "/emergency-dentistry/",
    link: "Explore Emergency Dentistry",
    bullets: ["Tooth pain and swelling", "Broken or chipped teeth", "Urgent appointment request path"],
  },
};

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function setService(key) {
  const service = services[key];
  if (!service) return;

  serviceTabs.forEach((tab) => {
    const isActive = tab.dataset.service === key;
    tab.classList.toggle("active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  serviceTitle.textContent = service.title;
  serviceDescription.textContent = service.description;
  serviceImage.src = service.image;
  serviceImage.alt = service.alt;
  serviceLink.href = service.href;
  serviceLink.textContent = service.link;
  serviceList.replaceChildren(
    ...service.bullets.map((bullet) => {
      const item = document.createElement("li");
      item.textContent = bullet;
      return item;
    }),
  );
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

serviceTabs.forEach((tab) => {
  tab.addEventListener("click", () => setService(tab.dataset.service));
});
