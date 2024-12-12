import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

export interface ApplicationStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  date?: string;
}

export interface Application {
  id: string;
  userId: string;
  agentId?: string;
  country: string;
  type: string;
  applicantName: string;
  applicationDate: string;
  status: 'pending' | 'processing' | 'approved' | 'rejected';
  amount: number;
  steps: ApplicationStep[];
  documents: {
    name: string;
    status: 'pending' | 'verified' | 'rejected';
  }[];
  timeline: {
    date: string;
    title: string;
    description: string;
  }[];
}

// Sample applications data with 10-digit alphanumeric IDs
const sampleApplications: Application[] = [
  {
    id: 'XK7L9M2NP4',
    userId: '9876543212',
    agentId: 'AGENT001',
    country: 'United States',
    type: 'Tourist Visa',
    applicantName: 'John Doe',
    applicationDate: '2024-03-15',
    status: 'processing',
    amount: 15000,
    steps: [
      {
        id: '1',
        title: 'Application Submitted',
        description: 'Initial application received',
        status: 'completed',
        date: '2024-03-15'
      },
      {
        id: '2',
        title: 'Document Verification',
        description: 'Verifying submitted documents',
        status: 'current',
        date: '2024-03-16'
      }
    ],
    documents: [
      { name: 'Passport', status: 'verified' },
      { name: 'Photo', status: 'verified' },
      { name: 'Bank Statement', status: 'pending' }
    ],
    timeline: []
  },
  // Add more sample applications as needed
];

interface ApplicationStore {
  applications: Application[];
  currentApplication: Application | null;
  addApplication: (application: Omit<Application, 'id'>) => string;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  assignToAgent: (applicationId: string, agentId: string) => void;
  updateStatus: (applicationId: string, status: Application['status']) => void;
  getApplication: (id: string) => Application | null;
  setCurrentApplication: (application: Application | null) => void;
  fetchApplications: () => void;
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      applications: sampleApplications,
      currentApplication: null,
      fetchApplications: async () => {
        try {
          const response = await fetch('http://localhost:5000/applications'); // Replace with your API URL
          if (!response.ok) {
            throw new Error('Failed to fetch applications');
          }
          const data = await response.json();
          set({ applications: data });
        } catch (error) {
          console.error('Error fetching applications:', error);
        }
      },
      addApplication: async (application) => {
        const id = nanoid(10).toUpperCase();
        const newApplication = { ...application, id };

        try {
          const response = await fetch('https://visa-five.vercel.app/applications/', {  // Replace with your API URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newApplication),
          });

          if (!response.ok) {
            throw new Error('Failed to add application');
          }

          set((state) => ({
            applications: [...state.applications, newApplication],
            currentApplication: newApplication,
          }));

          return id;
        } catch (error) {
          console.error('Error adding application:', error);
          return '';
        }
      },
      updateApplication: (id, updates) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id ? { ...app, ...updates } : app
          ),
          currentApplication:
            state.currentApplication?.id === id
              ? { ...state.currentApplication, ...updates }
              : state.currentApplication,
        }));
      },
      assignToAgent: (applicationId, agentId) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === applicationId ? { ...app, agentId } : app
          ),
        }));
      },
      updateStatus: (applicationId, status) => {
        set((state) => {
          const updatedApplications = state.applications.map((app) => {
            if (app.id === applicationId) {
              return { ...app, status };
            }
            return app;
          });

          const updatedCurrentApplication =
            state.currentApplication?.id === applicationId
              ? { ...state.currentApplication, status }
              : state.currentApplication;

          return {
            applications: updatedApplications,
            currentApplication: updatedCurrentApplication,
          };
        });
      },
      getApplication: (id) => {
        return get().applications.find((app) => app.id === id) || null;
      },
      setCurrentApplication: (application) => {
        set({ currentApplication: application });
      },
    }),
    {
      name: 'application-storage',
    }
  )
);
