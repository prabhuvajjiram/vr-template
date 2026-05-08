import { Module } from "@nestjs/common";
import { BookingModule } from "../booking/booking.module.js";
import { IntegrationsController } from "./integrations.controller.js";

@Module({
  imports: [BookingModule],
  controllers: [IntegrationsController]
})
export class IntegrationsModule {}
