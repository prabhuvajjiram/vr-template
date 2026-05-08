import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, Length, MaxLength } from "class-validator";
import { dentalServices, type DentalServiceId } from "@vadentalcare/shared";

const serviceIds = dentalServices.map((service) => service.id);

export class CreateBookingRequestDto {
  @IsIn(serviceIds)
  serviceId!: DentalServiceId;

  @IsOptional()
  @IsString()
  slotId?: string;

  @IsOptional()
  @IsString()
  preferredDate?: string;

  @IsOptional()
  @IsString()
  preferredTime?: string;

  @IsString()
  @Length(2, 80)
  firstName!: string;

  @IsString()
  @Length(2, 80)
  lastName!: string;

  @IsString()
  @Length(7, 30)
  phone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsBoolean()
  isNewPatient!: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(240)
  schedulingNote?: string;
}
