// Store for sidebar handling
import {create} from 'zustand';
const sidebarStore = create((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export default sidebarStore;
