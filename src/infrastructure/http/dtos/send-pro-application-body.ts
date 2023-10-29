import {
  IsInt,
  IsEnum,
  Min,
  Max,
  IsOptional,
  ValidateNested,
  IsNumber,
  IsObject,
  IsBoolean,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { EducationLevel } from '../../../domain/entitites/pro-application.entity';

export class PastExperiencesDto {
  @IsBoolean()
  sales: boolean;

  @IsBoolean()
  support: boolean;
}

export class InternetTestDto {
  @IsNumber()
  @Min(0)
  download_speed: number;

  @IsNumber()
  @Min(0)
  upload_speed: number;
}

export class SendProApplicationDto {
  @IsInt()
  @Min(0)
  age: number;

  @IsEnum(EducationLevel)
  education_level: EducationLevel;

  @IsObject()
  @ValidateNested()
  @Type(() => PastExperiencesDto)
  past_experiences: PastExperiencesDto;

  @IsObject()
  @ValidateNested()
  @Type(() => InternetTestDto)
  internet_test: InternetTestDto;

  @IsNumber()
  @Min(0)
  @Max(1)
  writing_score: number;

  @IsOptional()
  @IsString()
  referral_code?: string;
}
