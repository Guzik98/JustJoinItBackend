import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  Max,
  Min,
  ValidateNested
} from 'class-validator';
import { MarkerIcon } from '../enums/marker_icon.enum';
import { WorkplaceType } from '../enums/workplace_type.enum';
import { ExperienceLevel } from '../enums/experience_level.enum';
import { EmploymentType } from '../enums/employment_type.enum';
import { Type } from 'class-transformer';

export class CreateOffersDto {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
  @IsNotEmpty({ message: 'Street is required' })
  street: string;
  @IsNotEmpty({ message: 'City is required' })
  city: string;
  @IsNotEmpty({ message: 'Address is required' })
  address_text: string;
  @IsEnum(MarkerIcon)
  @IsNotEmpty({ message: 'Main tech is required' })
  marker_icon: string;
  @IsEnum(WorkplaceType)
  workplace_type: string;
  @IsNotEmpty({ message: 'Company name  is required' })
  company_name: string;
  company_url: string;
  @IsNotEmpty({ message: 'Company size is required' })
  company_size: string
  latitude: string;
  longitude: string;
  published_at: string;
  remote_interview: boolean;
  // @IsArray()
  // @ArrayMinSize(1)
  // @Type(() => SkillTypeDto)
  // @ValidateNested({ each: true })
  employment_types : EmploymentTypeDto[]
  company_logo_url : string
  @IsEnum(ExperienceLevel)
  experience_level: string
  id:string
  // @IsDefined()
  // @IsArray()
  // @ValidateNested()
  // @ArrayMinSize(1)
  // @Type(() => SkillTypeDto)
  skills: SkillTypeDto[]
}

export class EmploymentTypeDto {
  @IsEnum(EmploymentType)
  type: string
  salary: SalaryTypeDto
}

export class SalaryTypeDto {
  @Min(1000)
  @Max(100000)
  from: number
  @Min(1000)
  @Max(100000)
  to: number
  currency: string
}

export class SkillTypeDto {
  name: string;
  @Min(1)
  @Max(5)
  level: number;
}


