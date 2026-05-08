import type { AvailabilitySlot, BookingRequest, BookingRequestResult, DentalServiceId } from "@vadentalcare/shared";
import type { PmsIntegration, PmsIntegrationStatus } from "./pms-integration.js";

export class EaglesoftPicAdapter implements PmsIntegration {
  private readonly baseUrl = process.env.EAGLESOFT_PIC_BASE_URL;
  private readonly integrationKey = process.env.EAGLESOFT_INTEGRATION_KEY;
  private readonly userId = process.env.EAGLESOFT_USER_ID;
  private readonly password = process.env.EAGLESOFT_PASSWORD;

  status(): PmsIntegrationStatus {
    const configured = Boolean(this.baseUrl && this.integrationKey && this.userId && this.password);
    return {
      mode: "eaglesoft-pic",
      configured,
      writable: configured,
      message: configured
        ? "PIC credentials are present. Implement endpoint mapping after Patterson/PIC access is approved."
        : "PIC mode selected, but credentials are missing. Do not attempt direct Eaglesoft database access."
    };
  }

  async getAvailability(_serviceId: DentalServiceId, _fromDate?: string): Promise<AvailabilitySlot[]> {
    this.assertConfigured();
    throw new Error("Eaglesoft PIC availability endpoint mapping must be completed with practice-approved API documentation.");
  }

  async createBookingRequest(_request: BookingRequest): Promise<BookingRequestResult> {
    this.assertConfigured();
    throw new Error("Eaglesoft PIC appointment write mapping must be completed with practice-approved API documentation.");
  }

  private assertConfigured() {
    if (!this.status().configured) {
      throw new Error("Eaglesoft PIC adapter is not configured.");
    }
  }
}
