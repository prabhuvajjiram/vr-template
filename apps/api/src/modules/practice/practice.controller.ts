import { Controller, Get } from "@nestjs/common";
import { dentalServices, practiceProfile } from "@vadentalcare/shared";

@Controller("practice")
export class PracticeController {
  @Get()
  getPractice() {
    return {
      practice: practiceProfile,
      services: dentalServices
    };
  }
}
