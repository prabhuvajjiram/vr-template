import type {
  AvailabilitySlot,
  BookingRequest,
  BookingRequestResult,
  DentalServiceId
} from "@vadentalcare/shared";

export type PmsIntegrationStatus = {
  mode: "mock" | "eaglesoft-pic";
  configured: boolean;
  writable: boolean;
  message: string;
};

export interface PmsIntegration {
  status(): PmsIntegrationStatus;
  getAvailability(serviceId: DentalServiceId, fromDate?: string): Promise<AvailabilitySlot[]>;
  createBookingRequest(request: BookingRequest): Promise<BookingRequestResult>;
}

export const PMS_INTEGRATION = Symbol("PMS_INTEGRATION");
