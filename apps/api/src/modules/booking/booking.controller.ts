import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import type { DentalServiceId } from "@vadentalcare/shared";
import { CreateBookingRequestDto } from "./dto/create-booking-request.dto.js";
import { type PmsIntegration, PMS_INTEGRATION } from "./pms/pms-integration.js";

@Controller("booking")
export class BookingController {
  constructor(@Inject(PMS_INTEGRATION) private readonly pms: PmsIntegration) {}

  @Get("availability")
  getAvailability(@Query("serviceId") serviceId: DentalServiceId = "general-dentistry", @Query("fromDate") fromDate?: string) {
    return this.pms.getAvailability(serviceId, fromDate);
  }

  @Post("requests")
  createRequest(@Body() body: CreateBookingRequestDto) {
    return this.pms.createBookingRequest(body);
  }
}
