import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/gm;

export const authSchema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(8).regex(passwordRegex, "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."),
});
