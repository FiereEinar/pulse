import { z } from "zod";

export const userUpdateSchema = z.object({
  firstname: z.string().min(1, 'First name should not be empty').max(30, 'First name must be below 30 characters'),
  lastname: z.string().min(1, 'Last name should not be empty').max(30, 'Last name must be below 30 characters'),
  username: z.string().min(1, 'Username should not be empty').max(20, 'First name must be below 20 characters'),
  bio: z.string().max(300, 'Bio must be below 300 characters')
});
