import { Module } from "@nestjs/common";
import { BookingController } from "./booking.controller.js";
import { BookingService } from "./booking.service.js";
import { EaglesoftPicAdapter } from "./pms/eaglesoft-pic.adapter.js";
import { MockEaglesoftAdapter } from "./pms/mock-eaglesoft.adapter.js";
import { PMS_INTEGRATION } from "./pms/pms-integration.js";

@Module({
  controllers: [BookingController],
  providers: [
    BookingService,
    {
      provide: PMS_INTEGRATION,
      useFactory: () => (process.env.EAGLESOFT_MODE === "pic" ? new EaglesoftPicAdapter() : new MockEaglesoftAdapter())
    }
  ],
  exports: [BookingService, PMS_INTEGRATION]
})
export class BookingModule {}
