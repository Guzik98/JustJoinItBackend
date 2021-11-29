import { EmploymentTypeDto, SkillTypeDto } from './create-offers.dto';

export class UpdateOfferDto{
  workplace_type: string;
  remote_interview: boolean;
  skills: SkillTypeDto[]
  employment_types: EmploymentTypeDto[]
}