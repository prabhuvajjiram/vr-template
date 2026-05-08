import { findDentalService, type AvailabilitySlot, type BookingRequest, type BookingRequestResult, type DentalServiceId } from "@vadentalcare/shared";
import type { PmsIntegration, PmsIntegrationStatus } from "./pms-integration.js";

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}

function addBusinessDays(seed: Date, daysToAdd: number) {
  const date = new Date(seed);
  date.setHours(0, 0, 0, 0);
  let added = 0;

  while (added < daysToAdd) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      added += 1;
    }
  }

  return date;
}

export class MockEaglesoftAdapter implements PmsIntegration {
  status(): PmsIntegrationStatus {
    return {
      mode: "mock",
      configured: true,
      writable: true,
      message: "Mock PMS adapter active. Replace with Patterson Innovation Connection or an authorized partner before production booking."
    };
  }

  async getAvailability(serviceId: DentalServiceId, fromDate?: string): Promise<AvailabilitySlot[]> {
    const service = findDentalService(serviceId);
    const seed = fromDate ? new Date(`${fromDate}T09:00:00`) : new Date();
    const times = [
      [9, 0],
      [10, 30],
      [13, 0],
      [14, 30]
    ];

    return Array.from({ length: 3 }).flatMap((_, dayIndex) => {
      const day = addBusinessDays(seed, dayIndex + 1);
      return times.map(([hour, minute], timeIndex) => {
        const startsAt = new Date(day);
        startsAt.setHours(hour, minute, 0, 0);
        const endsAt = addMinutes(startsAt, service.durationMinutes);
        return {
          id: `${serviceId}-${day.toISOString().slice(0, 10)}-${timeIndex}`,
          serviceId,
          startsAt: startsAt.toISOString(),
          endsAt: endsAt.toISOString(),
          providerLabel: service.urgency === "urgent" ? "Urgent care team" : "Virginia Dental Care team",
          operatoryLabel: `Chair ${timeIndex + 1}`,
          source: "mock"
        };
      });
    });
  }

  async createBookingRequest(request: BookingRequest): Promise<BookingRequestResult> {
    const requestId = `VDC-${Date.now().toString(36).toUpperCase()}`;
    return {
      requestId,
      status: "PENDING_PMS_CONFIRMATION",
      message: `Request received for ${request.firstName}. The office will confirm the exact appointment time.`,
      pmsReference: `mock-${requestId}`
    };
  }
}
