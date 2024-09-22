import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTokenStore = create(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),    //set token 
      clearToken: () => set({ token: null }), //remove token
    }),
    {
      name: 'authToken',
    }
  )
);

export default useTokenStore;