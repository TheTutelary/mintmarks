import { z } from 'zod';
import { Role } from '../constants/enums';

export const RegisterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  name: z.string().min(2, 'Name is required'),
  role: z.nativeEnum(Role)
});

export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
