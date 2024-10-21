
export type Auth = {
  token: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}
