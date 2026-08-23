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
];
