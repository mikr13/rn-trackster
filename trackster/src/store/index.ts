import { client } from '@/lib/axios';
import type { Auth, SignUpData, SignUpState } from '@/types/auth';
import { errorNotification } from '@/utils/toast';
import { create, type StateCreator } from 'zustand';

export type LoaderState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

type Store = LoaderState & Auth;

const createLoadSlice: StateCreator<Store, [], [], LoaderState> = (set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
});

const createAuthSlice: StateCreator<Store, [], [], Auth> = (set, get) => ({
  token: null,
  signUp: async (data: SignUpData) => {
    get().setIsLoading(true);
    try {
      const res = await client.post<SignUpState>('/auth/signup', data);
      if (res.data.token) {
        set({ token: res.data.token });
        return true;
      } else {
        errorNotification(true, 'Failed to sign up', new Error(res.data.error));
        return false;
      }
    } catch (e) {
      errorNotification(true, 'Failed to sign up', e as unknown as Error);
      return false;
    } finally {
      get().setIsLoading(false);
    }
  },
  signIn: async (token: string) => set({ token }),
  signOut: () => set({ token: null }),
});

export const useStore = create<Store>()((...args) => ({
  ...createLoadSlice(...args),
  ...createAuthSlice(...args),
}))

export const isAuthenticated = () => useStore.getState().token !== null;
