import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1, 'Write something')
});
