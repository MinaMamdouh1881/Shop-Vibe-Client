import * as z from 'zod/v4';

export const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  userName: z
    .string()
    .min(8, { message: 'Username must be at least 8 characters' })
    .max(16, { message: 'Username must be at most 16 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password must be at most 16 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});
