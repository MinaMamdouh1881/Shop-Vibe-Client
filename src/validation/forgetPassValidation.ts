import * as z from 'zod/v4';

export const forgetPassSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});
