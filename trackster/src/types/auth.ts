
export type Auth = {
  token: string | null;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (token: string) => void;
  signOut: () => void;
}

export type SignUpData = {
  email: string;
  password: string;
}

export type SignUpState = {
  token?: string;
  error?: string;
};
