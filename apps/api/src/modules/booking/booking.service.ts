import { Inject, Injectable } from "@nestjs/common";
import type { BookingRequest, DentalServiceId } from "@vadentalcare/shared";
import { type PmsIntegration, PMS_INTEGRATION } from "./pms/pms-integration.js";

@Injectable()
export class BookingService {
  constructor(@Inject(PMS_INTEGRATION) private readonly pms: PmsIntegration) {}

  getAvailability(serviceId: DentalServiceId, fromDate?: string) {
    return this.pms.getAvailability(serviceId, fromDate);
  }

  createRequest(request: BookingRequest) {
    return this.pms.createBookingRequest(request);
  }
}
