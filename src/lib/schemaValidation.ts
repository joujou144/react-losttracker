import { z } from "zod";

export const userSignupFormSchema = z.object({
  name: z.string().min(10, "Please enter your first and last names.").max(50),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const userLoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const userProfileSchema = z.object({
  name: z.string().min(10, "Please enter your first and last names.").max(50),
  email: z.string().email(),
});

export const missingProfileFormSchema = z.object({
  name: z.string().min(10, "Subject's full name is required.").max(50),
  file: z.custom<File[]>(),
  description: z.string().min(10, "Description is required.").max(6300),
  location: z.string().min(5).max(100),
  date: z.date({
    required_error: "A date of last seen is required.",
  }),
});
