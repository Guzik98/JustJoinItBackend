import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty, IsNumber, IsOptional,
  Max, Min, MinLength, ValidateNested
} from 'class-validator';
import { MarkerIcon } from '../enums/marker_icon.enum';
import { WorkplaceType } from '../enums/workplace_type.enum';
import { ExperienceLevel } from '../enums/experience_level.enum';
import { EmploymentType } from '../enums/employment_type.enum';
import { Type } from 'class-transformer';

export class CreateOffersDto {
  @MinLength(5)
  @IsNotEmpty({ message: 'title' })
  title: string;
  @MinLength(5)
  @IsNotEmpty({ message: 'street' })
  street: string;
  @MinLength(5)
  @IsNotEmpty({ message: 'city' })
  city: string;
  @IsNotEmpty({ message: 'address_text' })
  address_text: string;
  @IsEnum(MarkerIcon)
  @IsNotEmpty({ message: 'marker_icon' })
  marker_icon: string;
  @IsEnum(WorkplaceType)
  workplace_type: string;
  @MinLength(5)
  @IsNotEmpty({ message: 'company_name' })
  company_name: string;
  @IsOptional()
  company_url: string;
  @IsNotEmpty({ message: 'company_size' })
  company_size: string
  latitude: string;
  longitude: string;
  published_at: string;
  @IsNotEmpty()
  country_code: string;
  @IsNotEmpty({message: 'remote_interview'})
  remote_interview: boolean;
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => EmploymentTypeDto)
  employment_types : EmploymentTypeDto[]
  company_logo_url : string
  @IsEnum(ExperienceLevel)
  experience_level: string
  id:string
  @IsDefined()
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => SkillTypeDto)
  skills: SkillTypeDto[]
}

export class SalaryTypeDto {
  @IsOptional()
  @Min(1000)
  @Max(100000)
  from: number
  @IsOptional()
  @Min(1000)
  @Max(100000)
  to: number
  @IsOptional()
  currency: string
}

export class EmploymentTypeDto {
  @IsNotEmpty({message: 'type'})
  @IsEnum(EmploymentType)
  type: string
  @IsOptional()
  @IsDefined()
  @ValidateNested({ each: true })
  salary: SalaryTypeDto | null
}

export class SkillTypeDto {
  @IsNotEmpty({message: 'name'})
  name: string;
  @IsNumber()
  @Min(1)
  @Max(5)
  level: number;
}


