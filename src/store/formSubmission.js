// Store for Form Submission
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
const useFormSubmission = create(
    persist(
      (set) => ({
        appDetails: {},
        addAppDetails: (data) => set({ appDetails: data }),   // Method to add formDetails
        clearAppDetails: () => set({ appDetails: {} }),       // Method to clear formDetails
      }),
      {
        name: 'form-storage', // Name of the storage key
        storage: createJSONStorage(() => localStorage), // Use localStorage
      },
    )
  );
  
  export default useFormSubmission;