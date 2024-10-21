import type { Auth } from '@/types/auth';
import { create, type StateCreator } from 'zustand';

export type LoaderState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const createLoadSlice: StateCreator<LoaderState> = (set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
});

const createAuthSlice: StateCreator<Auth> = (set) => ({
  token: null,
  signIn: (token: string) => set({ token }),
  signOut: () => set({ token: null }),
});


export const useStore = create<LoaderState & Auth>()((...args) => ({
  ...createLoadSlice(...args),
  ...createAuthSlice(...args),
}))
