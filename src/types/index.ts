export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  visaTypes: VisaType[];
  processingTime: string;
  price: number;
  fees: number;
  imageUrl: string;
  tags: string[];
  continent: string;
  popularity: number;
  requirements: string[];
  isActive: boolean;
  successRate: number;
  peakSeason: {
    months: string;
    temperature: string;
    rainfall: string;
    events: string[];
  };
  attractions: {
    name: string;
    description: string;
    image: string;
    type: string;
  }[];
  timeline: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: {
    id: string;
    question: string;
    answer: string;
    category: string;
  }[];
}

export interface VisaType {
  id: string;
  name: string;
  duration: string;
  price: number;
  processingTime: string;
  type: 'sticker' | 'e-visa' | 'on-arrival';
  description?: string;
  requirements?: string[];
  isPopular?: boolean;
}

// ... rest of the types remain unchanged