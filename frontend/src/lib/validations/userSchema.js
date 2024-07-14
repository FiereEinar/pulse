import { z } from "zod";

export const userUpdateSchema = z.object({
  firstname: z.string().min(1, 'First name should not be empty'),
  lastname: z.string().min(1, 'Last name should not be empty'),
  username: z.string().min(1, 'Username should not be empty'),
  bio: z.string()
});
