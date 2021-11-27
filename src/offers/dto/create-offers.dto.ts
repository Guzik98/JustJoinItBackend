import { IsNotEmpty, Length } from 'class-validator';

export class CreateOffersDto  {
  @IsNotEmpty({ message: 'Title is required' })
  title: string;
  // @IsNotEmpty({ message: 'Street is required' })
  street: string;
  // @IsNotEmpty({ message: 'City is required' })
  city: string;
  // @IsNotEmpty({ message: 'Address is required' })
  address_text: string;
  marker_icon: string;
  workplace_type: string;
  company_name: string;
  company_url: string;
  company_size: string
  latitude: string;
  longitude: string;
  published_at: string;
  remote_interview: boolean;
  employment_types : EmploymentTypeDto[]
  company_logo_url : string
  id:string
  skills: SkillTypeDto[]
}

export class EmploymentTypeDto {
  type: string
  salary: SalaryTypeDto
}

export class SalaryTypeDto {
  // @Length(4,6)
  from: number
  // @Length(4,6)
  to: number
  currency: string
}

export class SkillTypeDto {
  name: string;
  level: number;
}


