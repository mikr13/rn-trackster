
export type Auth = {
  token: string | null;
  signUp: (data: SignInOrUpData) => Promise<boolean>;
  signIn: (data: SignInOrUpData) => Promise<boolean>;
  signOut: () => void;
}

export type SignInOrUpData = {
  email: string;
  password: string;
}

export type SignInOrUpState = {
  token?: string;
  error?: string;
};

export const AUTH_TOKEN_KEY = 'auth-token';
