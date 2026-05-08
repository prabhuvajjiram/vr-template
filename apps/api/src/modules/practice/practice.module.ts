import { Module } from "@nestjs/common";
import { PracticeController } from "./practice.controller.js";

@Module({
  controllers: [PracticeController]
})
export class PracticeModule {}
