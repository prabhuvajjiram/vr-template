import { Module } from "@nestjs/common";
import { BookingModule } from "./booking/booking.module.js";
import { IntegrationsModule } from "./integrations/integrations.module.js";
import { PracticeModule } from "./practice/practice.module.js";

@Module({
  imports: [PracticeModule, BookingModule, IntegrationsModule]
})
export class AppModule {}
