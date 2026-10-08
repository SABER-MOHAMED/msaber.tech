export interface Milestone {
  id: string;
  sentence: string;
  image: string;
  alt: string;
}

export const milestones: Milestone[] = [
  {
    id: 'university-of-twente',
    sentence: 'At the University of Twente for my MSc thesis, image captured by supervisor Prof. Amir Yousefzadeh',
    image: '/blog/mohamed-saber-university-of-twente.jpg',
    alt: 'Mohamed Saber at the University of Twente',
  },
  {
    id: 'messy-office-twente-caes',
    sentence: 'Messy office at CAES, University of Twente',
    image: '/blog/messy_office_twente_CAES.png',
    alt: 'Messy office desk at CAES, University of Twente',
  },
  {
    id: 'graduation-day',
    sentence: 'Graduation day',
    image: '/blog/mohamed-saber-graduation-day.jpeg',
    alt: 'Mohamed Saber graduation day',
  },
];
