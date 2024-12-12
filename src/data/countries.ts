import type { Country } from '../types';

// Helper function to generate visa types
const generateVisaTypes = (country: string) => [
  {
    id: `tourist-${country.toLowerCase()}`,
    name: 'Tourist Visa',
    duration: '30 days',
    price: Math.floor(Math.random() * (15000 - 3000) + 3000),
    processingTime: ['24h', '3d', '5d', '7d'][Math.floor(Math.random() * 4)],
    type: ['sticker', 'e-visa', 'on-arrival'][Math.floor(Math.random() * 3)] as 'sticker' | 'e-visa' | 'on-arrival'
  },
  {
    id: `business-${country.toLowerCase()}`,
    name: 'Business Visa',
    duration: '90 days',
    price: Math.floor(Math.random() * (25000 - 15000) + 15000),
    processingTime: ['5d', '7d', '10d', '15d'][Math.floor(Math.random() * 4)],
    type: 'sticker'
  }
];

// Function to get a random image for a country
const getRandomImage = (category: string) => {
  const images = {
    city: [
      'https://images.unsplash.com/photo-1485738422979-f5c462d49f74',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be',
      'https://images.unsplash.com/photo-1517935706615-2717063c2225'
    ],
    nature: [
      'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd',
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3',
      'https://images.unsplash.com/photo-1519922639192-e73293ca430e',
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21'
    ],
    landmark: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      'https://images.unsplash.com/photo-1543783207-ec64e4d95325'
    ]
  };
  
  const categoryImages = images[category as keyof typeof images] || images.city;
  return categoryImages[Math.floor(Math.random() * categoryImages.length)];
};

// Function to determine continent based on country
const getContinent = (country: string): string => {
  const continentMap: { [key: string]: string } = {
    'United States': 'americas',
    'Canada': 'americas',
    'United Kingdom': 'europe',
    'France': 'europe',
    'Germany': 'europe',
    'Italy': 'europe',
    'Spain': 'europe',
    'China': 'asia',
    'Japan': 'asia',
    'India': 'asia',
    'Australia': 'oceania',
    'New Zealand': 'oceania',
    // Add more mappings as needed
  };
  
  return continentMap[country] || 'other';
};

// Generate countries data
const generateCountries = () => {
  const allCountries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark",
    "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt",
    "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
    "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
    "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania",
    "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
    "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay",
    "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
    "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent", "Samoa",
    "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia",
    "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain",
    "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
    "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen",
    "Zambia", "Zimbabwe"
  ];

  return allCountries.map(countryName => {
    const id = countryName.toLowerCase().replace(/\s+/g, '-');
    const code = countryName.substring(0, 2).toUpperCase();
    const popularity = Math.floor(Math.random() * (95 - 70) + 70) / 10;
    const continent = getContinent(countryName);
    const imageCategory = ['city', 'nature', 'landmark'][Math.floor(Math.random() * 3)];

    return {
      id,
      name: countryName,
      code,
      flag: `https://flagcdn.com/${code.toLowerCase()}.svg`,
      visaTypes: generateVisaTypes(countryName),
      processingTime: ['10-15 days', '15-20 days', '20-25 days'][Math.floor(Math.random() * 3)],
      price: Math.floor(Math.random() * (20000 - 5000) + 5000),
      fees: Math.floor(Math.random() * (1500 - 500) + 500),
      imageUrl: getRandomImage(imageCategory),
      tags: ['tourist', 'business', 'student', 'work', 'immigration']
        .sort(() => Math.random() - 0.5)
        .slice(0, 3),
      continent,
      popularity,
      requirements: ['passport', 'photo', 'bank_statement', 'travel_insurance', 'hotel_booking']
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
    };
  }).sort((a, b) => b.popularity - a.popularity);
};

export const countryData = generateCountries();