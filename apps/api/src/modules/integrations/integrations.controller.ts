import { Controller, Get, Inject } from "@nestjs/common";
import { type PmsIntegration, PMS_INTEGRATION } from "../booking/pms/pms-integration.js";

@Controller("integrations")
export class IntegrationsController {
  constructor(@Inject(PMS_INTEGRATION) private readonly pms: PmsIntegration) {}

  @Get("eaglesoft/status")
  getEaglesoftStatus() {
    return this.pms.status();
  }
}
