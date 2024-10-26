
export type Auth = {
  token: string | null;
  changePassword: (data: ChangePasswordData) => Promise<boolean>;
  signUp: (data: SignInOrUpData) => Promise<boolean>;
  signIn: (data: SignInOrUpData) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
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
