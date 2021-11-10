import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { User } from "../../auth/user.entity";

export class CreateOffersDto  {
  title: string;
  street: string;
  city: string;
  address_text: string;
  marker_icon: string;
  workplace_type: string;
  company_name: string;
  company_url: string;
  company_size: string
  experience_level: string;
  latitude: string;
  longitude: string;
  published_at: string;
  remote_interview: boolean;
  id: string;
  from: number;
  to: number;
  currency: number;
  employment_types : EmploymentTypeDto[]
  company_logo_url : string
  skills: SkillTypeDto[]
}

export class EmploymentTypeDto {
  type: string
  salary: SalaryTypeDto

}


export class SalaryTypeDto {
  from: number
  to: number
  currency: string
}
export class SkillTypeDto {
  name: string;
  level: number;
}


