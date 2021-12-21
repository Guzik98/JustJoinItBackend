import { Offer } from '../../schema/offer.schema';

export const  offerStub = (): Offer => {
  return {
    _id: undefined,
    company_logo_url: 'logo',
    company_name: 'Intro-kop',
    company_size: '12',
    company_url: 'brak',
    country_code: 'pln',
    employment_types: [{
      type: 'b2b',
      salary: {
        from: 12000,
        to: 14000,
        currency: 'pln'
      }
    }],
    experience_level: 'junior',
    id: 'Intro-kop-Sopot',
    latitude: '42.4234234234',
    longitude: '42.4234234234',
    marker_icon: 'javascript',
    published_at: '2021-11-07T20:01:15.946Z',
    remote_interview: false,
    skills: [
      {
      name: 'react',
      level: 2,
      },
      {
        name: 'typescript',
        level: 3,
      }
    ],
    workplace_type: 'office',
    title: 'Junior frontend developer',
    street: 'Antoniego abrahama 6/2',
    city: 'Sopot',
    address_text: 'Antoniego abrahama 6/2, Sopot'
  }
}