import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain minimum of 6 characters." }),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must contain minimum of 6 characters." }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must contain minimum of 6 characters." }),
  username: z
    .string()
    .min(3, { message: "Username must contain minimum of 3 characters." }),
  firstName: z
    .string()
    .min(3, { message: "First name must contain minimum of 3 characters." }),
  lastName: z
    .string()
    .min(3, { message: "Last name must contain minimum of 3 characters." }),
  occupation: z
    .string()
    .min(3, { message: "Occupation must contain minimum of 6 characters." }),
});
