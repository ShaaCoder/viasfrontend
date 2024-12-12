import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { Country, VisaType } from '../types';
import { countryData } from '../data/countries';

interface CountryStore {
  countries: Country[];
  addCountry: (country: Omit<Country, 'id'>) => string;
  updateCountry: (id: string, updates: Partial<Country>) => void;
  deleteCountry: (id: string) => void;
  toggleCountryStatus: (id: string) => void;
  addVisaType: (countryId: string, visaType: Omit<VisaType, 'id'>) => void;
  updateVisaType: (countryId: string, visaTypeId: string, updates: Partial<VisaType>) => void;
  deleteVisaType: (countryId: string, visaTypeId: string) => void;
  updateCountryFAQs: (countryId: string, faqs: any[]) => void;
  updateCountryAttractions: (countryId: string, attractions: any[]) => void;
  updateCountryTimeline: (countryId: string, timeline: any[]) => void;
}

// Initialize countries with isActive set to true
const initialCountries = countryData.map(country => ({
  ...country,
  isActive: true
}));

export const useCountryStore = create<CountryStore>()(
  persist(
    (set, get) => ({
      countries: initialCountries,
      
      addCountry: (country) => {
        const id = nanoid();
        set((state) => ({
          countries: [...state.countries, { ...country, id }]
        }));
        return id;
      },

      updateCountry: (id, updates) => {
        set((state) => ({
          countries: state.countries.map((country) =>
            country.id === id ? { ...country, ...updates } : country
          )
        }));
      },

      deleteCountry: (id) => {
        set((state) => ({
          countries: state.countries.filter((country) => country.id !== id)
        }));
      },

      toggleCountryStatus: (id) => {
        set((state) => ({
          countries: state.countries.map((country) =>
            country.id === id
              ? { ...country, isActive: !country.isActive }
              : country
          )
        }));
      },

      addVisaType: (countryId, visaType) => {
        const id = nanoid();
        set((state) => ({
          countries: state.countries.map((country) =>
            country.id === countryId
              ? {
                  ...country,
                  visaTypes: [...country.visaTypes, { ...visaType, id }]
                }
              : country
          )
        }));
      },

      updateVisaType: (countryId, visaTypeId, updates) => {
        set((state) => ({
          countries: state.countries.map((country) =>
            country.id === countryId
              ? {
                  ...country,
                  visaTypes: country.visaTypes.map((visaType) =>
                    visaType.id === visaTypeId
                      ? { ...visaType, ...updates }
                      : visaType
                  )
                }
              : country
          )
        }));
      },

      deleteVisaType: (countryId, visaTypeId) => {
        set((state) => ({
          countries: state.countries.map((country) =>
            country.id === countryId
              ? {
                  ...country,
                  visaTypes: country.visaTypes.filter(
                    (visaType) => visaType.id !== visaTypeId
                  )
                }
              : country
          )
        }));
      },

      updateCountryFAQs: (countryId, faqs) => {
        set((state) => ({
          countries: state.countries.map((country) =>
            country.id === countryId
              ? { ...country, faqs }
              : country
          )
        }));
      },

      updateCountryAttractions: (countryId, attractions) => {
        set((state) => ({
          countries: state.countries.map((country) =>
            country.id === countryId
              ? { ...country, attractions }
              : country
          )
        }));
      },

      updateCountryTimeline: (countryId, timeline) => {
        set((state) => ({
          countries: state.countries.map((country) =>
            country.id === countryId
              ? { ...country, timeline }
              : country
          )
        }));
      },
    }),
    {
      name: 'country-storage',
    }
  )
);