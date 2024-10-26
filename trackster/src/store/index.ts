import { client } from '@/lib/axios';
import { AUTH_TOKEN_KEY, type Auth, type ChangePasswordData, type SignInOrUpData, type SignInOrUpState } from '@/types/auth';
import { errorNotification, hideToast, loadNotification } from '@/utils/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  changePassword: async (data: ChangePasswordData) => {
    loadNotification();
    try {
      const res = await client.post<SignInOrUpState>('/auth/change-password', data, {
        headers: {
          Authorization: `Bearer ${get().token}`,
        },
      });
      if (res.data.token) {
        set({ token: res.data.token });
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, res.data.token);
        hideToast();
        return true;
      } else {
        errorNotification(true, 'Failed to change password', new Error(res.data.error));
        return false;
      }
    } catch (e) {
      errorNotification(true, 'Failed to change password', e as unknown as Error);
      return false;
    }
  },
  signUp: async (data: SignInOrUpData) => {
    loadNotification();
    try {
      const res = await client.post<SignInOrUpState>('/auth/signup', data);
      if (res.data.token) {
        set({ token: res.data.token });
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, res.data.token);
        hideToast();
        return true;
      } else {
        errorNotification(true, 'Failed to sign up', new Error(res.data.error));
        return false;
      }
    } catch (e) {
      errorNotification(true, 'Failed to sign up', e as unknown as Error);
      return false;
    }
  },
  signIn: async (data: SignInOrUpData) => {
    loadNotification();
    try {
      const res = await client.post<SignInOrUpState>('/auth/signin', data);
      if (res.data.token) {
        set({ token: res.data.token });
        await AsyncStorage.setItem(AUTH_TOKEN_KEY, res.data.token);
        hideToast();
        return true;
      } else {
        errorNotification(true, 'Failed to sign in', new Error(res.data.error));
        return false;
      }
    } catch (e) {
      errorNotification(true, 'Failed to sign in', e as unknown as Error);
      return false;
    }
  },
  signOut: async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    set({ token: null });
  },
});

export const useStore = create<Store>()((...args) => {
  const store = {
    ...createLoadSlice(...args),
    ...createAuthSlice(...args),
  };

  // Initialization function to get the token from AsyncStorage
  const initializeStore = async () => {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      store.token = token;
    } else {
      store.token = null;
    }
  };

  // Call the initialization function
  initializeStore();

  return store;
});

export const isAuthenticated = () => useStore.getState().token !== null;
