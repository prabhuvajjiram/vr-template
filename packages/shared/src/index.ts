export type DentalServiceId =
  | "general-dentistry"
  | "cosmetic-dentistry"
  | "periodontics"
  | "implant-dentistry"
  | "emergency-dentistry";

export type DentalService = {
  id: DentalServiceId;
  name: string;
  shortName: string;
  summary: string;
  imageUrl: string;
  treatments: string[];
  topics: string[];
  durationMinutes: number;
  urgency: "routine" | "soon" | "urgent";
};

export type PracticeProfile = {
  name: string;
  city: string;
  state: string;
  phoneDisplay: string;
  phoneE164: string;
  addressLines: string[];
  hours: string[];
  bookingUrl: string;
  mapUrl: string;
};

export type AvailabilitySlot = {
  id: string;
  serviceId: DentalServiceId;
  startsAt: string;
  endsAt: string;
  providerLabel: string;
  operatoryLabel: string;
  source: "mock" | "eaglesoft-pic" | "authorized-partner";
};

export type BookingRequest = {
  serviceId: DentalServiceId;
  slotId?: string;
  preferredDate?: string;
  preferredTime?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  isNewPatient: boolean;
  concern: string;
};

export type BookingRequestResult = {
  requestId: string;
  status: "REQUESTED" | "PENDING_PMS_CONFIRMATION" | "CONFIRMED";
  message: string;
  pmsReference?: string;
};

export const practiceProfile: PracticeProfile = {
  name: "Virginia Dental Care",
  city: "Arlington",
  state: "VA",
  phoneDisplay: "(703) 276-1010",
  phoneE164: "+17032761010",
  addressLines: ["915 N Quincy St", "Arlington, VA 22203"],
  hours: ["Monday-Friday: 8:00 AM-4:00 PM", "Saturday-Sunday: Closed"],
  bookingUrl: "https://microsite.adit.com/db00b47b-6313-4081-bb30-6fe436af8323",
  mapUrl: "https://maps.app.goo.gl/oVwcr1YoKGvbXzDJ7"
};

export const dentalServices: DentalService[] = [
  {
    id: "general-dentistry",
    name: "General Dentistry",
    shortName: "General",
    summary: "Preventive cleanings, exams, X-rays, fillings, and practical treatment planning.",
    imageUrl: "https://vadentalcare.com/wp-content/uploads/2025/01/generaldentistry_img.jpg",
    treatments: ["Cleanings and exams", "Fillings and crowns", "Oral cancer screening"],
    topics: [
      "Types of Cleanings",
      "Cavities",
      "Crowns",
      "Bridges",
      "Root Canal",
      "Preventative Fillings",
      "Missing Teeth",
      "White Fillings",
      "Emergency Extraction",
      "Sedation Options"
    ],
    durationMinutes: 60,
    urgency: "routine"
  },
  {
    id: "cosmetic-dentistry",
    name: "Cosmetic Dentistry",
    shortName: "Cosmetic",
    summary: "Smile-focused care for whitening, bonding, veneers, and natural-looking restorations.",
    imageUrl: "https://vadentalcare.com/wp-content/uploads/2025/01/cosmeticdentistry_img.jpg",
    treatments: ["Whitening", "Veneer consults", "Smile restoration planning"],
    topics: ["Porcelain Veneers", "Bonded Veneers", "Clear Braces/Invisalign", "Teeth Whitening"],
    durationMinutes: 60,
    urgency: "routine"
  },
  {
    id: "periodontics",
    name: "Periodontics",
    shortName: "Gum Care",
    summary: "Gum-health evaluation, maintenance, and periodontal treatment explained clearly.",
    imageUrl: "https://vadentalcare.com/wp-content/uploads/2025/01/periodontalservices_img.jpg",
    treatments: ["Gum evaluation", "Deep cleaning path", "Maintenance visits"],
    topics: [
      "Causes of Gum Disease",
      "Treatment for Gum Disease",
      "Teeth Cleaning",
      "Gum Recession",
      "Gum Abscess",
      "Gummy Smile",
      "Gum Bleaching",
      "Crown Lengthening",
      "Surgical Extractions",
      "Wisdom Teeth"
    ],
    durationMinutes: 75,
    urgency: "soon"
  },
  {
    id: "implant-dentistry",
    name: "Implant Dentistry",
    shortName: "Implants",
    summary: "A consult path for missing teeth, treatment timelines, and implant restoration options.",
    imageUrl: "https://vadentalcare.com/wp-content/uploads/2025/01/dental-implatns.jpg",
    treatments: ["Implant consults", "Missing-tooth options", "Surgical/restorative planning"],
    topics: ["Dental Implants", "Bone Grafting", "Sinus Lift", "Snap on Dentures", "Teeth in a Day"],
    durationMinutes: 75,
    urgency: "routine"
  },
  {
    id: "emergency-dentistry",
    name: "Emergency Dentistry",
    shortName: "Emergency",
    summary: "Fast triage for tooth pain, swelling, broken teeth, and urgent dental symptoms.",
    imageUrl: "https://vadentalcare.com/wp-content/uploads/2025/01/dentist-visit-1-1.jpg",
    treatments: ["Tooth pain", "Broken or chipped teeth", "Urgent appointment request"],
    topics: [
      "Tooth Pain",
      "Broken or Chipped Teeth",
      "Swelling or Infection",
      "Lost Crown or Filling",
      "Emergency Extraction"
    ],
    durationMinutes: 45,
    urgency: "urgent"
  }
];

export function findDentalService(serviceId: DentalServiceId): DentalService {
  const service = dentalServices.find((item) => item.id === serviceId);
  if (!service) {
    throw new Error(`Unknown dental service: ${serviceId}`);
  }
  return service;
}
