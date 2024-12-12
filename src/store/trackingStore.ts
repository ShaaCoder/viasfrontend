import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useApplicationStore } from './applicationStore';

interface TrackingStore {
  getApplication: (id: string) => any;
}

export const useTrackingStore = create<TrackingStore>()((set, get) => ({
  getApplication: (id: string) => {
    // Get application from the main application store
    const application = useApplicationStore.getState().getApplication(id);
    
    if (!application) return null;

    // Transform application data for tracking view
    return {
      id: application.id,
      country: application.country,
      type: application.type,
      applicantName: application.applicantName,
      applicationDate: application.applicationDate,
      status: application.status,
      steps: application.steps,
      documents: application.documents
    };
  }
}));